from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import or_, and_, UniqueConstraint
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt
from models.smart_park_base import SmartParkBase

from models.models import Friends,Pending_Friendships,Favorited, Visit

class User(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = (
        '-dogs', 
        '-created_at',
        '-updated_at', 
        '-reviews',
        '-friends_1', 
        '-friends_2',
        '-pend_friends_1',
        '-pend_friends_2',
        # '-wsroom', 
    )

    username = db.Column(db.String)
    _password = db.Column(db.String)
    image = db.Column(db.String)
    admin = db.Column(db.Boolean)

    __table_args__=(UniqueConstraint(
        'username', name='unique_username_constraint'
    ),)

    dogs = db.relationship('Dog', back_populates = 'user', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates = 'user', cascade = "all, delete-orphan")
    
    # wsroom = db.relationship('WebSocket_Rooms', back_populates = 'user')

    favorited = db.relationship('Favorited', back_populates = 'user', cascade = "all, delete-orphan")
    favorited_parks = association_proxy('favorited', 'dog_park')

    # recentparks - query Visits table and grab all unique dogpark instances, 
    # if a user checks in use websocket to update the recent parks data in their active session

    friends_1 = db.relationship('User',
            secondary = 'friends',
            primaryjoin = 'Friends.friend_1_id == User.id',
            secondaryjoin = 'Friends.friend_2_id == User.id',
            back_populates = 'friends_2',
            lazy = 'dynamic'
        )
    
    friends_2 = db.relationship('User',
            secondary = 'friends',
            primaryjoin = 'Friends.friend_2_id == User.id',
            secondaryjoin = 'Friends.friend_1_id == User.id',
            back_populates = 'friends_1',
            lazy = 'dynamic'
        )
    
    pend_friends_1 = db.relationship('User',
            secondary = 'pending_friendships',
            primaryjoin = 'Pending_Friendships.pend_friend_1_id == User.id',
            secondaryjoin = 'Pending_Friendships.pend_friend_2_id == User.id',
            back_populates = 'pend_friends_2',
            lazy = 'dynamic'
        )
    
    pend_friends_2 = db.relationship('User',
                secondary = 'pending_friendships',
                primaryjoin = 'Pending_Friendships.pend_friend_2_id == User.id',
                secondaryjoin = 'Pending_Friendships.pend_friend_1_id == User.id',
                back_populates = 'pend_friends_1',
                lazy = 'dynamic'
            )
    
    def all_friends(self, user_id):
        friend_list = []
        cached_col_1_friends = self.friends_2.all()
        cached_col_2_friends = self.friends_1.all()

        def create_filter_terms (friend_object, user_id, col_1_f, col_2_f):
            
            ## friend object is through friend_1 column
            option1 = and_(friend_object.id == Friends.friend_1_id, user_id == Friends.friend_2_id)      
            
            ## friend object is through friend_2 column
            option2 = and_(friend_object.id == Friends.friend_2_id, user_id == Friends.friend_1_id) 

            if col_1_f and col_2_f:
                return or_(option1, option2)
            elif col_1_f and not col_2_f:
                return option1
            elif not col_1_f and col_2_f:
                return option2
            else:
                return None
            
        try:
            if cached_col_2_friends:
                for fo in cached_col_2_friends:
                    friend_list.append({'fo':fo, 'friendship_id':Friends.query.filter(
                        create_filter_terms(fo, user_id, cached_col_1_friends, cached_col_2_friends)
                        ).first().id
                    })

            if cached_col_1_friends:
                for fo in cached_col_1_friends:
                    friend_list.append({'fo':fo, 'friendship_id':Friends.query.filter(
                        create_filter_terms(fo, user_id, cached_col_1_friends, cached_col_2_friends)
                        ).first().id
                    })
        except:
            friend_list = None
    
        return friend_list

    def pending_friends(self, user_id):

        pending_friend_list = []
        cached_col_1_pend_friends = self.pend_friends_2.all()
        cached_col_2_pend_friends = self.pend_friends_1.all()

        def create_filter_terms (pending_friend_object, user_id, col_1_f, col_2_f):
            
            ## friend object is through friend_1 column
            option1 = and_(pending_friend_object.id == Pending_Friendships.pend_friend_1_id, user_id == Pending_Friendships.pend_friend_2_id)      
            
            ## friend object is through friend_2 column
            option2 = and_(pending_friend_object.id == Pending_Friendships.pend_friend_2_id, user_id == Pending_Friendships.pend_friend_1_id) 

            if col_1_f and col_2_f:
                return or_(option1, option2)
            elif col_1_f and not col_2_f:
                return option1
            elif not col_1_f and col_2_f:
                return option2
            else:
                return None
        
        try:
            if cached_col_2_pend_friends:
                for pfo in cached_col_2_pend_friends:
                    pending_friend_list.append({'pfo':pfo, 'sender': True, 'friendship_id':Pending_Friendships.query.filter(
                        create_filter_terms(pfo, user_id, cached_col_1_pend_friends, cached_col_2_pend_friends)
                        ).first().id
                    })

            if cached_col_1_pend_friends:
                for pfo in cached_col_1_pend_friends:
                    pending_friend_list.append({'pfo':pfo, 'sender': False, 'friendship_id':Pending_Friendships.query.filter(
                        create_filter_terms(pfo, user_id, cached_col_1_pend_friends, cached_col_2_pend_friends)
                        ).first().id
                    })
        except:
            pending_friend_list = None
    
        return pending_friend_list
    
    # def add_friend(self, target_friend):
    #     pass

    # def delete_friend(self, target_friend):
    #     pass

    def recent_parks(self):
        
        ## query visits database
        ## grab the last 7 UNIQUE dogpark instances associated with this user
            ## if a person went to park twice recently, give the most updated date
    
        dog_id_list = [dog.id for dog in self.dogs]
        recent_visits = (Visit.query.filter(
                    Visit.dogs_id.in_(dog_id_list)
                ).order_by(Visit.created_at.desc())
                .distinct(Visit.dog_parks_id)
                .limit(7)
                .all()
            )

        recents_list = []

        for visit in recent_visits:
            recents_list.append(
                {
                    'date_of_visit' : visit.created_at,
                    'dog_park_data' : visit.dog_park
                }
            )
            
        return recents_list

    def add_favorite_park(self, user):
        if len(self.favorited.filter(Favorited.dog_park_id == user.id)) == 0:
            self.favorited.append(user)

    def remove_favorite_park(self, user):
        if len(self.favorited.filter(Favorited.dog_park_id == user.id)) > 0:
            self.favorited.remove(user)
            
    ##Password Validations
    
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password=""):
        self._password = bcrypt.generate_password_hash(
            password.encode('utf-8')).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password, password.encode('utf-8'))
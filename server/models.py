from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import or_, and_
from flask import session
# from sqlalchemy import UniqueConstraint

from config import db, bcrypt

class SmartParkBase():
    id = db.Column(db.Integer, primary_key = True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

class Friends(db.Model, SmartParkBase, SerializerMixin):

    ## If I want to be able to add elements to this table
    ## By updating users I am going to need to have to create
    ## Backrefs or backpopulates

    __tablename__ = 'friends'

    # No need yet, but once I add backref or backpopulates
    # I will need to add serialization rules
    # serialize_rules = (,)

    friend_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user1 = db.relationship('User', foreign_keys=[friend_1_id], back_populates='friend_users_1')
    # user2 = db.relationship('User', foreign_keys=[friend_2_id], back_populates='friend_users_2')

class Pending_Friendships(db.Model, SmartParkBase, SerializerMixin):

    ## If I want to be able to add elements to this table
    ## By updating users I am going to need to have to create
    ## Backrefs or backpopulates

    __tablename__ = "pending_friendships"

    # serialize_rules = (,)

    pend_friend_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pend_friend_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Code does not work as intended, may be a sqlite3 issue, test after swapping to postgres
    # __table_args__ = (
    #     db.UniqueConstraint('pend_friend_1_id', 'pend_friend_2_id', name='unique_pending_friendship'),
    # )

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

    dogs = db.relationship('Dog', back_populates = 'user', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates = 'user', cascade = "all, delete-orphan")
    
    # wsroom = db.relationship('WebSocket_Rooms', back_populates = 'user')

    favorited = db.relationship('Favorited', back_populates = 'user', cascade = "all, delete-orphan")
    favorited_parks = association_proxy('favorited', 'dog_park')

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
                import ipdb;ipdb.set_trace()
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
                    friend_list.append({'pfo':fo, 'friendship_id':Friends.query.filter(
                        create_filter_terms(fo, user_id, cached_col_1_friends, cached_col_2_friends)
                        ).first().id
                    })

            if cached_col_1_friends:
                for fo in cached_col_1_friends:
                    friend_list.append({'pfo':fo, 'friendship_id':Friends.query.filter(
                        create_filter_terms(fo, user_id, cached_col_1_friends, cached_col_2_friends)
                        ).first().id
                    })
        except:
            friend_list = None
    
        return friend_list

    def pending_friends(self):

        user_id = session.get('user_id')

        def create_filter_terms (pending_friend_object):

            option1 = and_(pending_friend_object.id == Pending_Friendships.pend_friend_1_id, user_id == Pending_Friendships.pend_friend_2_id)
            option2 = and_(pending_friend_object.id == Pending_Friendships.pend_friend_2_id, user_id == Pending_Friendships.pend_friend_1_id) 
    
            return or_(option1, option2)
        
        return ([{'pfo':pf, 'sender': True, 'friendship_id':Pending_Friendships.query.filter(create_filter_terms(pf)).first().id} for pf in self.pend_friends_1.all()] + 
                [{'pfo':pf, 'sender': False, 'friendship_id':Pending_Friendships.query.filter(create_filter_terms(pf)).first().id} for pf in self.pend_friends_2.all()])
    
    # def add_friend(self, target_friend):
    #     pass

    # def delete_friend(self, target_friend):
    #     pass

    def add_favorite_park(self, user):
        ## check to see if this entry already exists in db
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

class Dog(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'dogs'

    serialize_rules = ('-visits','-created_at','-updated_at', '-user',)
    
    name = db.Column(db.String)
    breed = db.Column(db.String)
    weight = db.Column(db.Integer)
    age = db.Column(db.Integer)
    image = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates = 'dogs')

    # using cascade to delete relationship objects
    visits = db.relationship('Visit', back_populates = 'dog', cascade="all, delete-orphan")
    dog_parks = association_proxy('visits', 'dog_park')

class Visit(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'visits'

    serialize_rules = ('-dog_park','dog', '-created_at','-updated_at')
    
    length_of_stay = db.Column(db.Integer)
    actual_length_of_stay = db.Column(db.Integer)

    dogs_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    dog_parks_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    
    dog_park = db.relationship('Dog_Park', back_populates = 'visits')
    dog = db.relationship('Dog', back_populates = 'visits')

class Dog_Park(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'dog_parks'

    serialize_rules = ('-visits','-created_at','-updated_at')
    
    name = db.Column(db.String)
    address = db.Column(db.String)
    # rating = db.Column(db.Numeric(precision = 3, scale = 2),
    #                    db.CheckConstraint('rating = round(rating, 2)',
    #                                       name = 'rating_precision_check'))
    rating = db.Column(db.Float)
    amenities = db.Column(db.String)
    image = db.Column(db.String)

    # using cascade to delete relationships
    visits = db.relationship('Visit', back_populates = 'dog_park', cascade="all, delete-orphan")
    dogs = association_proxy('visits', 'dog')

    reviews = db.relationship('Review', back_populates='dog_park', cascade="all, delete-orphan")
    
    favorited = db.relationship('Favorited', back_populates = 'dog_park', cascade="all, delete-orphan")
    favorited_users = association_proxy('favorited', 'user')

    @validates('image')
    def image_url_validation(self, key, attr):
        if 'http' and '://' in attr:
            return attr
        else:
            raise ValueError
        
    
    @validates('rating')
    def float_precision_rounding(self, key, attr):
        if attr:
            return round(attr,2)
        return attr         

class Review(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'reviews'

    serialize_rules = ('-dog_park','-created_at','-updated_at', '-user',)

    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    dog_park_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'reviews')
    dog_park = db.relationship('Dog_Park', back_populates = 'reviews')
    
    @validates('rating')
    def rating_validation(self, key, attr):
        if int(attr) in [1,2,3,4,5]:
            return attr
        else:
            raise AttributeError

class Favorited(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'favorited'

    serialize_rules = ('-user','-dog_park',)

    dog_park_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'favorited')
    dog_park = db.relationship('Dog_Park', back_populates = 'favorited')

# class WebSocket_Rooms(db.Model, SerializerMixin):

#     __tablename__ = 'websocketrooms'

#     serialize_rules = ('',)

#     id = db.Column(db.Integer, primary_key = True)
#     room_name = db.Column(db.String, unique = True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     user = db.relationship('User', back_populates = 'wsroom') 

#     __table_args__ = (
#         UniqueConstraint('room_name', name='unique_room_name_constraint'),
#     )
    



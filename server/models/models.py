from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from models.smart_park_base import SmartParkBase

# from sqlalchemy import UniqueConstraint

from config import db

class Friends(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = 'friends'

    # No need yet, but once I add backref or backpopulates
    # I will need to add serialization rules
    # serialize_rules = (,)

    friend_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user1 = db.relationship('User', foreign_keys=[friend_1_id], back_populates='friend_users_1')
    # user2 = db.relationship('User', foreign_keys=[friend_2_id], back_populates='friend_users_2')

class Pending_Friendships(db.Model, SmartParkBase, SerializerMixin):

    __tablename__ = "pending_friendships"

    # serialize_rules = (,)

    pend_friend_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pend_friend_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Code does not work as intended, may be a sqlite3 issue, test after swapping to postgres
    # __table_args__ = (
    #     db.UniqueConstraint('pend_friend_1_id', 'pend_friend_2_id', name='unique_pending_friendship'),
    # )

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
    



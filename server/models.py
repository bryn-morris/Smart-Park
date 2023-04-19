from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-dogs', '-created_at','-updated_at')

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    # Password hash
    password = db.Column(db.String)
    image = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', back_populates = 'user', cascade="all, delete-orphan")

class Dog(db.Model, SerializerMixin):

    __tablename__ = 'dogs'

    serialize_rules = ('-visits','-created_at','-updated_at', '-user')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    weight = db.Column(db.Integer)
    age = db.Column(db.Integer)
    image = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates = 'dogs')

    # using cascade to delete relationship objects
    visits = db.relationship('Visit', back_populates = 'dog', cascade="all, delete-orphan")
    dog_parks = association_proxy('visits', 'dog_park')

class Visit(db.Model, SerializerMixin):

    __tablename__ = 'visits'

    serialize_rules = ('-dog_park','dog', '-created_at','-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    length_of_stay = db.Column(db.Integer)
    actual_length_of_stay = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    dogs_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    # dogs_id2 = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    # dogs_id3 = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    dog_parks_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    
    dog_park = db.relationship('Dog_Park', back_populates = 'visits')
    dog = db.relationship('Dog', back_populates = 'visits')

class Dog_Park(db.Model, SerializerMixin):

    __tablename__ = 'dog_parks'

    serialize_rules = ('-visits','-created_at','-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    rating = db.Column(db.Integer)
    amenities = db.Column(db.String)
    image = db.Column(db.String)


    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # using cascade to delete relationships
    visits = db.relationship('Visit', back_populates = 'dog_park', cascade="all, delete-orphan")
    dogs = association_proxy('visits', 'dog')

    # @validates('year')
    # def year_validation(self, key, attr):
    #     valid_fields = ['AI','Robotics', 'Machine Learning', 'Vision', 'Cybersecurity']
    #     if attr not in valid_fields:
    #         raise AttributeError('Please select a valid field of study!: AI,Robotics, Machine Learning, Vision, or Cybersecurity')
    #     else:
    #         return attr
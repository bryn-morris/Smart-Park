from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

class Friends(db.Model, SerializerMixin):

    __tablename__ = 'friends'

    serialize_rules = ('',)

    id = db.Column(db.Integer, primary_key = True)
    friend_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user1 = db.relationship('User', foreign_keys=[friend_1_id], back_populates='friend_users_1')
    # user2 = db.relationship('User', foreign_keys=[friend_2_id], back_populates='friend_users_2')

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-dogs', '-created_at','-updated_at', '-reviews','-friends',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password = db.Column(db.String)
    image = db.Column(db.String)
    admin = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', back_populates = 'user', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates = 'user', cascade = "all, delete-orphan")
    
    favorited = db.relationship('Favorited', back_populates = 'user', cascade = "all, delete-orphan")
    favorited_parks = association_proxy('favorited', 'dog_park')

    friends = db.relationship('User',
                              secondary = 'friends',
                              primaryjoin = 'Friends.friend_1_id == User.id',
                              secondaryjoin = 'Friends.friend_2_id == User.id',
                              )

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

class Dog(db.Model, SerializerMixin):

    __tablename__ = 'dogs'

    serialize_rules = ('-visits','-created_at','-updated_at', '-user',)
    
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
    dog_parks_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    
    dog_park = db.relationship('Dog_Park', back_populates = 'visits')
    dog = db.relationship('Dog', back_populates = 'visits')

class Dog_Park(db.Model, SerializerMixin):

    __tablename__ = 'dog_parks'

    serialize_rules = ('-visits','-created_at','-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    # rating = db.Column(db.Numeric(precision = 3, scale = 2),
    #                    db.CheckConstraint('rating = round(rating, 2)',
    #                                       name = 'rating_precision_check'))
    rating = db.Column(db.Float)
    amenities = db.Column(db.String)
    image = db.Column(db.String)


    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

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

class Review(db.Model, SerializerMixin):

    __tablename__ = 'reviews'

    serialize_rules = ('-dog_park','-created_at','-updated_at', '-user',)

    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    dog_park_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user = db.relationship('User', back_populates = 'reviews')
    dog_park = db.relationship('Dog_Park', back_populates = 'reviews')
    
    @validates('rating')
    def rating_validation(self, key, attr):
        if int(attr) in [1,2,3,4,5]:
            return attr
        else:
            raise AttributeError

class Favorited(db.Model, SerializerMixin):

    __tablename__ = 'favorited'

    serialize_rules = ('-user','-dog_park',)

    id = db.Column(db.Integer, primary_key = True)
    dog_park_id = db.Column(db.Integer, db.ForeignKey('dog_parks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'favorited')
    dog_park = db.relationship('Dog_Park', back_populates = 'favorited')
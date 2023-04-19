#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Dog, Visit, Dog_Park, Review

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    User.query.delete()
    Dog.query.delete()
    Visit.query.delete()
    Dog_Park.query.delete()

    print("Creating Users...")

    users_list = [User( username= faker.user_name(),  password= faker.word(), image = faker.image_url()) for _ in range(1,5)]

    print("Creating Dogs...")

    dogs_list = [Dog(name = faker.name(), breed = faker.name(), weight = randint(5,100), age = randint(1,10), image = faker.image_url(), user_id = randint(1,5)) for _ in range(1,10) ]

    print("Creating Visits...")

    visits_list = [Visit(dogs_id = randint(1,10), dog_parks_id = randint(1,5), length_of_stay = randint(1,120)) for _ in range(1,20)]

    print("Creating Dog Parks...")

    dog_parks_list = [Dog_Park(name = faker.name(), address = faker.address(), rating = randint(1,5), amenities = faker.sentence(), image = faker.image_url()) for _ in range(1,5)]
    
    print("Creating Reviews...")

    reviews_list = [Review(name= faker.user_name(),  comment= faker.sentence(), rating = randint(1,5), dog_park_id=randint(1,5)) for _ in range(1,10)]

    db.session.add_all(users_list)
    db.session.add_all(dogs_list)
    db.session.add_all(visits_list)
    db.session.add_all(dog_parks_list)
    db.session.add_all(reviews_list)
    
    db.session.commit()

    print("Seeding done!")

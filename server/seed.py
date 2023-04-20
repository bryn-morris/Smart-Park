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
    Review.query.delete()

    print("Creating Users...")

    u1 = User( username= 'beau_the_wizrd',  _password= faker.word(), image = 'https://t3.ftcdn.net/jpg/02/47/26/12/360_F_247261221_eGirP3pgZpNU8RY3yRG1qEslnRkNGKCk.jpg')
    u2 = User( username= 'bryn_the_wizrd',  _password= faker.word(), image = 'https://i.pinimg.com/originals/92/a2/27/92a2274106026911bfb86ba6763fd921.jpg')
    u3 = User( username= 'damon_the_wizrd',  _password= faker.word(), image = 'https://static.vecteezy.com/system/resources/previews/002/007/779/original/cool-cartoon-wizard-vector.jpg')
    u4 = User( username= 'mads_the_wizrd',  _password= faker.word(), image = 'https://www.kindpng.com/picc/m/732-7323240_how-to-wizard-robes-cartoon-hd-png-download.png')


    # users_list = [User( username= faker.user_name(),  _password= faker.word(), image = faker.image_url()) for _ in range(1,5)]

    print("Creating Dogs...")

    d1 = Dog(name = 'Cosmo', breed = 'Kitten', weight = 2, age = 1, image = 'https://weu-az-web-ca-cdn.azureedge.net/mediacontainer/medialibraries/mypetdoctor/images/blog-images/grey-kitten.webp?ext=.webp', user = u1)
    d2 = Dog(name = 'Basil', breed = 'Great Dane', weight = 140, age = 5, image = 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-07/Great%20Dane2.jpg?h=ed3b5c5b&itok=fATbM8s9', user = u2)
    d3 = Dog(name = 'Ammo', breed = 'Lab', weight = 80, age = 5, image = faker.image_url(), user = u3)
    d4 = Dog(name = 'Birdie', breed = 'NewfyDoodle', weight = 60, age = 1, image = faker.image_url(), user = u4)
    d5 = Dog(name = 'Zeke', breed = 'Great Pyrenees', weight = 150, age = 9, image = faker.image_url(), user = u4)

    # dogs_list = [Dog(name = faker.name(), breed = faker.name(), weight = randint(5,100), age = randint(1,10), image = faker.image_url(), user_id = randint(1,5)) for _ in range(1,10) ]

    

    print("Creating Dog Parks...")

    dp1 = Dog_Park(name = 'Chaos Central', address = "102 Whilwind Ave, Chicago, IL, 20039", rating = 4, amenities = 'constant wind, drinking fountain, turf', image = faker.image_url())
    dp2 = Dog_Park(name = 'Open Meadows', address = "2983 Green St, Bend, OR, 69401", rating = 5, amenities = 'gentle rolling hills, quiet breeze, birds chirping', image = faker.image_url())
    dp3 = Dog_Park(name = 'Dirt Bowl', address = "73 Dessert St, Phoenix, AZ, 98703", rating = 2, amenities = 'dust, cactus', image = faker.image_url())
    dp4 = Dog_Park(name = 'Splash Park', address = "19 Ocean View, Oceanside, CA, 302036", rating = 4, amenities = 'constant wind, drinking fountain, turf', image = faker.image_url())
    dp5 = Dog_Park(name = 'Fetch Zone', address = "36 Trailside Run, Boston, MA, 80372", rating = 5, amenities = 'endless tennis balls, 73 fenced in acres', image = faker.image_url())

    # dog_parks_list = [Dog_Park(name = faker.name(), address = faker.address(), rating = randint(1,5), amenities = faker.sentence(), image = faker.image_url()) for _ in range(1,5)]
    
    print("Creating Visits...")
    
    v1 = Visit(dog = d1, dog_park = dp2, length_of_stay = 30)
    v2 = Visit(dog = d2, dog_park = dp5, length_of_stay = 60)
    v3 = Visit(dog = d3, dog_park = dp1, length_of_stay = 45)
    v4 = Visit(dog = d2, dog_park = dp4, length_of_stay = 35)
    v5 = Visit(dog = d4, dog_park = dp4, length_of_stay = 45)


    # visits_list = [Visit(dogs_id = randint(1,10), dog_parks_id = randint(1,5), length_of_stay = randint(1,120)) for _ in range(1,20)]
    
    print("Creating Reviews...")

    r1 = Review(name='mads', comment='Wow I have never seen my pup so excited. She loved riding the waves in the pool!', rating=4, dog_park=dp4)
    r2 = Review(name='beau', comment='Gorgeous and so peaceful. Great time to relax for me and my kitten...I mean dog.', rating=5, dog_park=dp2)
    r3 = Review(name='damon', comment='Great spot for my doggo to get his energy out! Cannot beat unlimited tennis balls.', rating=4, dog_park=dp5)
    r4 = Review(name='bryn', comment='Basil had the time of his life.. he took a nap in the sun and could not have been happier.', rating=4, dog_park=dp2)
    r5 = Review(name='birdie', comment='What da hecko.. I luv dirt and could dig dig dig here! Doggos go here now!', rating=5, dog_park=dp3)

    # reviews_list = [Review(name= faker.user_name(),  comment= faker.sentence(), rating = randint(1,5), dog_park_id=randint(1,5)) for _ in range(1,10)]

    db.session.add_all([d1, d2, d3, d4, d5])
    db.session.add_all([u1, u2, u3, u4])
    db.session.add_all([v1, v2, v3, v4])
    db.session.add_all([dp1, dp2, dp3, dp4, dp5])
    db.session.add_all([r1,r2,r3,r4,r5])
    
    db.session.commit()

    print("Seeding done!")

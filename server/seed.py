#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db

from models import (
    User, 
    Dog, 
    Visit,
    Dog_Park,
    Review, 
    Favorited, 
    Friends,
    Pending_Friendships,
    # WebSocket_Rooms,
)

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    
    User.query.delete()
    Dog.query.delete()
    Visit.query.delete()
    Dog_Park.query.delete()
    Review.query.delete()
    Favorited.query.delete()
    Friends.query.delete()
    Pending_Friendships.query.delete()
    # WebSocket_Rooms.query.delete()

    print("Creating Users...")

    u1 = User( username= 'beau_the_wizrd',  password= 'password', admin = False, image = 'https://t3.ftcdn.net/jpg/02/47/26/12/360_F_247261221_eGirP3pgZpNU8RY3yRG1qEslnRkNGKCk.jpg')
    u2 = User( username= 'bryn_the_wizrd',  password= 'password', admin = True, image = 'https://i.pinimg.com/originals/92/a2/27/92a2274106026911bfb86ba6763fd921.jpg')
    u3 = User( username= 'damon_the_wizrd',  password= 'password', admin = False, image = 'https://static.vecteezy.com/system/resources/previews/002/007/779/original/cool-cartoon-wizard-vector.jpg')
    u4 = User( username= 'mads_the_wizrd',  password= 'password', admin = False, image = 'https://www.kindpng.com/picc/m/732-7323240_how-to-wizard-robes-cartoon-hd-png-download.png')

    # users_list = [User( username= faker.user_name(),  _password= faker.word(), image = faker.image_url()) for _ in range(1,5)]

    print("Creating Dogs...")

    d1 = Dog(name = 'Cosmo', breed = 'Kitten', weight = 6, age = 1, image = 'https://i.imgur.com/YTc5Ku0.jpeg', user = u1)
    d2 = Dog(name = 'Basil', breed = 'Great Dane', weight = 145, age = 5, image = 'https://i.imgur.com/lSwtAWn.jpeg', user = u2)
    d3 = Dog(name = 'Ammo', breed = 'Lab', weight = 96, age = 5, image = 'https://i.imgur.com/eMVwIo8.jpeg', user = u3)
    d4 = Dog(name = 'Birdie', breed = 'NewfyDoodle', weight = 62, age = 1, image = 'https://i.imgur.com/9KLzxrt.jpeg', user = u4)
    d5 = Dog(name = 'Zeke', breed = 'Great Pyrenees', weight = 150, age = 9, image = 'https://i.imgur.com/V5K0YjC.jpeg', user = u4)

    # dogs_list = [Dog(name = faker.name(), breed = faker.name(), weight = randint(5,100), age = randint(1,10), image = faker.image_url(), user_id = randint(1,5)) for _ in range(1,10) ]

    print("Creating Dog Parks...")

    dp1 = Dog_Park(name = 'Chaos Central', address = "102 Whilwind Ave, Chicago, IL, 20039", amenities = 'constant wind, drinking fountain, turf', image = 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    dp2 = Dog_Park(name = 'Open Meadows', address = "2983 Green St, Bend, OR, 69401", rating = 4.50, amenities = 'gentle rolling hills, quiet breeze, birds chirping', image = 'https://images.unsplash.com/photo-1621851327323-bc467dd48d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')
    dp3 = Dog_Park(name = 'Dirt Bowl', address = "73 Dessert St, Phoenix, AZ, 98703", rating = 5.00, amenities = 'dust, cactus', image = 'https://images.unsplash.com/photo-1470208564179-dd5b52a0d010?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1262&q=80')
    dp4 = Dog_Park(name = 'Splash Park', address = "19 Ocean View, Oceanside, CA, 302036", rating = 4.00, amenities = 'pool, puddles, fountains', image = 'https://images.unsplash.com/photo-1600179787118-5cac22037b2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    dp5 = Dog_Park(name = 'Fetch Zone', address = "36 Trailside Run, Boston, MA, 80372", rating = 4.00, amenities = 'endless tennis balls, 73 fenced in acres', image = 'https://images.unsplash.com/photo-1569992274375-e56b14e234f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80')

    # dog_parks_list = [Dog_Park(name = faker.name(), address = faker.address(), rating = randint(1,5), amenities = faker.sentence(), image = faker.image_url()) for _ in range(1,5)]
    
    print("Creating Visits...")
    
    v1 = Visit(dog = d1, dog_park = dp2, length_of_stay = 30)
    v2 = Visit(dog = d2, dog_park = dp5, length_of_stay = 60)
    v3 = Visit(dog = d3, dog_park = dp1, length_of_stay = 45)
    v4 = Visit(dog = d2, dog_park = dp4, length_of_stay = 35)
    v5 = Visit(dog = d4, dog_park = dp4, length_of_stay = 45)

    # visits_list = [Visit(dogs_id = randint(1,10), dog_parks_id = randint(1,5), length_of_stay = randint(1,120)) for _ in range(1,20)]
    
    print("Creating Reviews...")

    r1 = Review(comment='Wow I have never seen my pup so excited. She loved riding the waves in the pool!', rating=4, dog_park=dp4, user = u4)
    r2 = Review(comment='Gorgeous and so peaceful. Great time to relax for me and my kitten...I mean dog.', rating=5, dog_park=dp2, user = u1)
    r3 = Review(comment='Great spot for my doggo to get his energy out! Cannot beat unlimited tennis balls.', rating=4, dog_park=dp5, user = u3)
    r4 = Review(comment='Basil had the time of his life.. he took a nap in the sun and could not have been happier.', rating=4, dog_park=dp2, user = u2)
    r5 = Review(comment='What da hecko.. I luv dirt and could dig dig dig here! Doggos go here now!', rating=5, dog_park=dp3, user = u4)

    # reviews_list = [Review(name= faker.user_name(),  comment= faker.sentence(), rating = randint(1,5), dog_park_id=randint(1,5)) for _ in range(1,10)]

    print("Creating Favorites...")

    f1 = Favorited(dog_park=dp4, user = u4)
    f2 = Favorited(dog_park=dp2, user = u1)
    f3 = Favorited(dog_park=dp5, user = u3)
    f4 = Favorited(dog_park=dp2, user = u2)
    f5 = Favorited(dog_park=dp3, user = u4)
    f6 = Favorited(dog_park=dp1, user = u2)
    f7 = Favorited(dog_park=dp4, user = u2)

    print("Creating Friendships...")

    fr1 = Friends(friend_1_id=2, friend_2_id = 3)
    fr2 = Friends(friend_1_id=1, friend_2_id = 2)
    fr3 = Friends(friend_1_id=3, friend_2_id = 4)
    fr4 = Friends(friend_1_id=4, friend_2_id = 1)
    
    print("Creating Pending Frienships...")
    pfr1 = Pending_Friendships(pend_friend_1_id = 2, pend_friend_2_id = 4)
    pfr2 = Pending_Friendships(pend_friend_1_id = 3, pend_friend_2_id = 1)

    # print("Creating WebSocket rooms...")
    # ws1 = WebSocket_Rooms(room_name = 'test_room', user_id = None)
    # ws2 = WebSocket_Rooms(room_name = 'test_room2', user_id = None)
    

    db.session.add_all([d1, d2, d3, d4, d5])
    db.session.add_all([u1, u2, u3, u4])
    db.session.add_all([v1, v2, v3, v4])
    db.session.add_all([dp1, dp2, dp3, dp4, dp5])
    db.session.add_all([r1,r2,r3,r4,r5])
    db.session.add_all([f1,f2,f3,f4,f5,f6,f7])
    db.session.add_all([fr1,fr2,fr3,fr4])
    db.session.add_all([pfr1, pfr2])
    # db.session.add_all([ws1, ws2])
    
    db.session.commit()

    print("Seeding done!")

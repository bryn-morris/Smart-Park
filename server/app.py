#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import (
    User, 
    Dog, 
    Visit, 
    Dog_Park, 
    Review, 
    Favorited, 
    Friends,
    Pending_Friendships,
)

# Views go here!

# class Users(Resource):
#     def get(self):
#         users = User.query.all()
#         return make_response(
#             [user.to_dict() for user in users],
#             200
#         )
# api.add_resource(Users, '/users')

# class UserById(Resource):
#     def get(self, id):
#         user = User.query.filter_by(id=id).first()
#         if not user:
#             return make_response(
#                 {'error': 'User not found'},
#                 404
#             )
#         return make_response(
#             user.to_dict(rules = ('dogs',)),
#             200
#         )
# api.add_resource(UserById, '/users/<int:id>')

#######################################################
###########        Admin Authentication Wrapper
#######################################################

def Admin_Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        sel_user = User.query.filter(session['user_id']==User.id).one()
        if sel_user.admin==False:
            return make_response({"error": "Authentication failed - User is not admin"},401)
        return func(*args, **kwargs)

    return wrapper_func

#######################################################
###########        Check-Session 
#######################################################

def Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):

        try:
            sel_user = User.query.filter(session['user_id']==User.id).one()
        except:
            return make_response({"error":"User is not logged in!"}, 401)

        return func(*args, **kwargs)

    return wrapper_func

############################################################
#########               Authentication
############################################################

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
      
            new_user = User(
                username = data['username'],
                image = data['image'],
                password = data['password']
            )
            db.session.add(new_user)
            db.session.commit()

            user = User.query.filter(
                User.username == data['username']
            ).first()

            session['user_id'] = user.id

            import ipdb;ipdb.set_trace()
            
        except:
            return {'error': 'Must enter a valid username, password, and url'}, 401
        return make_response(
            new_user.to_dict(rules=('dogs','-_password',)),
            200
        )
api.add_resource(Signup, '/signup')
        
class Login(Resource):
    
    def post(self):
        
        try:
            data = request.get_json()

            user = User.query.filter(
                User.username == data['username']
            ).first()
            user.authenticate(data['password'])

            session['user_id'] = user.id

            resp = make_response(
                user.to_dict(rules=('dogs','-_password','reviews','-favorited',)),
                200
            )
            return resp
        except:
            return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return session.get('user_id')
api.add_resource(Logout, '/logout')

############################################################
#########               
############################################################

class Dog_Parks(Resource):
    def get(self):

        dog_parks = [dp.to_dict(
            only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
            )

        ) for dp in Dog_Park.query.all()
        ]

        return make_response(dog_parks, 200)
    
    @Admin_Authentication_Decorator
    def post(self):

        try:
            dogpark = Dog_Park(
                name = request.get_json()['name'],
                amenities = request.get_json()['amenities'],
                address = request.get_json()['address'],
                image = request.get_json()['image']
            )
        except ValueError:
            response_body = {'message':'hey u goofed put in a valid url pls'}
            return make_response(response_body, 409)
        else:
            db.session.add(dogpark)
            db.session.commit()
            return make_response(dogpark.to_dict(), 201)
    
api.add_resource(Dog_Parks, '/dogparks')

@app.route('/dogparks/<int:id>', methods = ['DELETE', 'PATCH'])
@Admin_Authentication_Decorator
def dog_park_by_id(id):

    try:
        sel_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()
        
        if request.method == 'DELETE':
            
            db.session.delete(sel_dog_park)
            db.session.commit()

            return make_response({}, 200)
        
        if request.method == 'PATCH':
            for attr in request.get_json():
                setattr(sel_dog_park, attr, request.get_json()[attr])
            
            db.session.add(sel_dog_park)
            db.session.commit()

            return make_response(
                sel_dog_park.to_dict(only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
            )), 200
            )
    except:
        return make_response({"error":"404 Dog Park Not Found"}, 404)
            
class Dogs(Resource):
    def get(self):
        dogs = Dog.query.all()

        return make_response(
            [dog.to_dict(rules = ('user','dog_parks')) for dog in dogs],
            200
        )
    
    def post(self):
        data = request.get_json()
        new_dog = Dog(
            name = data['name'],
            breed = data['breed'],
            weight = data['weight'],
            age = data['age'],
            image = data['image'],
            user_id = data['user_id']
        )

        db.session.add(new_dog)
        db.session.commit()
        return make_response(
            new_dog.to_dict(),
            201
        )

api.add_resource(Dogs, '/dogs')

class DogById(Resource):
    def get(self,id):
        dog = Dog.query.filter_by(id=id).first()
        if not dog:
            return make_response(
                {'error': 'Dog not found.'},
                404
            )
        return make_response(
            dog.to_dict(rules = ('user',)),
            200
        )

    def delete(self, id):
        dog = Dog.query.filter_by(id=id).first()
        if not dog:
            return make_response(
                {'error': 'Dog not found.'},
                404
            )
        db.session.delete(dog)
        db.session.commit()
        return make_response(
            {'delete': 'delete successful'},
            200
        )
    
    def patch(self, id):

        data = request.get_json()
        dog = Dog.query.filter_by(id=id).first()

        for key in data.keys():
            setattr(dog, key, data[key])
        db.session.add(dog)
        db.session.commit()
        return make_response(
            dog.to_dict(),
            200
        )

api.add_resource(DogById, '/dogs/<int:id>')

class Check_In_To_Park(Resource):

    def post(self):

        newVisit = Visit(
            length_of_stay = request.get_json()['lengthOfStay'].replace(' min',''),
            dogs_id = Dog.query.filter(Dog.name == request.get_json()['dogName']).one().id,
            dog_parks_id = Dog_Park.query.filter(Dog_Park.name == request.get_json()['dogParkName']).one().id,
        ) 
        db.session.add(newVisit)
        db.session.commit()
        return make_response(newVisit.to_dict(), 200)
    
api.add_resource(Check_In_To_Park, '/visits')

@app.route('/visits/<int:id>', methods = ['DELETE', 'PATCH'])
def visit_by_id(id):

    selVisit = Visit.query.filter(Visit.id == id).one()

    if request.method == 'DELETE':

        db.session.delete(selVisit)
        db.session.commit()

        return make_response({}, 204)
    
    if request.method == 'PATCH':

        selVisit.actual_length_of_stay = request.get_json()['actualLengthOfStay']
        
        db.session.add(selVisit)
        db.session.commit()

        return make_response(selVisit.to_dict(), 200)

###############################################
###########        Review Views
###############################################

class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 201)
    
api.add_resource(Reviews, '/reviews')

@app.route('/review_dog_park/<int:id>', methods = ['POST', 'PATCH', 'DELETE', 'GET'])
def add_review_and_patch_dog_park_rating(id):
    
    # import ipdb;ipdb.set_trace()

    data = request.get_json()
    
    if request.method in ['POST', 'PATCH']:
        new_rating = float(data['rating'])
        
           
    if request.method in ['PATCH', 'DELETE']:
        try:
            sel_review = Review.query.filter(Review.id == data['id']).one()   
        except:
            return make_response({'message': 'Review not found in database!'}, 404)    

    if request.method == 'POST':
       
        ## Shouldn't ever be tripped, but leaving in for redundancy
        if Review.query.filter(db.and_(session['user_id'] == Review.user_id, id == Review.dog_park_id)).first():
            return make_response({'error':'duplicate record'}, 409)

        rating_list = [rev.rating for rev in Review.query.filter(Review.dog_park_id == id)]

        try:

            new_review = Review(
                comment = data['comment'],
                rating = new_rating,
                dog_park_id = id,
                user_id = data['user_id']
            )

            db.session.add(new_review)
            db.session.commit()
            ## Patch the DogPark Rating in the DB
            specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()
            specific_dog_park.rating = sum(rating_list, new_rating)/(len(rating_list)+1)

        except:
            
            response_body = {'message': 'Hey you goober, enter between 1-5'}
            return make_response(response_body, 403)

        db.session.add(new_review)
        db.session.add(specific_dog_park)

        db.session.commit()

        response_body = {
            'updated_dog_park': specific_dog_park.to_dict(only = (
                    'id',
                    'name',
                    'amenities',
                    'address',
                    'rating',
                    'image',
                    'reviews.id',
                    'reviews.comment',
                    'reviews.rating',
                    'reviews.user.username',
                    'favorited',
            ))

            ## Need to pull dog park state out into context, and then update that state
            ## with the updated_dog_park
        }

        return make_response(response_body, 201)

    if request.method == 'PATCH':

        old_database_rating = sel_review.rating

        for attr in data:
                setattr(sel_review, attr, request.get_json()[attr])

        db.session.add(sel_review)
        db.session.commit()
    
        specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()

        if request.get_json()['rating'] != old_database_rating:

            ## if rating has changed, update rating of dog park,
            ## otherwise just return the dog park and we will see the changed
            ## comment through eachDogPark.reviews.map
            
            rating_list = [rev.rating for rev in Review.query.filter(Review.dog_park_id == id)]
            specific_dog_park.rating = sum(rating_list)/(len(rating_list))

            db.session.add (specific_dog_park)
            db.session.commit()

        response_body = {'updated_dog_park' : specific_dog_park.to_dict(only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
            ))}
        
        return make_response(response_body, 200)

    if request.method == 'DELETE':

        db.session.delete(sel_review)
        db.session.commit()

        specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()

        updated_rating_list = [rev.rating for rev in Review.query.filter_by(dog_park_id = id)]

        # need to update dog park rating in db
        if updated_rating_list == []:
            specific_dog_park.rating = None
            ## may be an issue with line above with validation
            ## if so add line to validation to return none if value == None
            db.session.add(specific_dog_park)
            db.session.commit()

        response_body = {}

        if updated_rating_list != []:

            new_dp_avg_rating = sum(updated_rating_list)/len(updated_rating_list) if updated_rating_list else 0

            specific_dog_park.rating = new_dp_avg_rating
            
            db.session.add(specific_dog_park)
            db.session.commit()

            response_body = {'new_dp_avg_rating': new_dp_avg_rating}

        return make_response(response_body, 200)

@app.route('/favorite', methods = ['POST'])
def favorite():

    dog_park_id = request.get_json()['dog_park_id']
    user_id = request.get_json()['user_id']

    newFavoriteJoin = Favorited(
        dog_park_id = dog_park_id,
        user_id = user_id,
    )
    selected_dog_park = Dog_Park.query.filter(Dog_Park.id == dog_park_id).one()

    db.session.add(newFavoriteJoin)
    db.session.commit()

    return make_response(selected_dog_park.to_dict(
        only = (
            'id',
            'name',
            'amenities',
            'address',
            'rating',
            'image',
            'reviews.id',
            'reviews.comment',
            'reviews.rating',
            'reviews.user.username',
            'favorited',
        )
    ), 201)

@app.route('/favorite/<int:id>', methods = ['DELETE'])
def favorite_by_id(id):

    try:
        selected_entry = Favorited.query.filter(Favorited.id == id).one()
        selected_dog_park = selected_entry.dog_park
    except:
        return make_response({"message":"404 Entry not found!"}, 404)
    
    db.session.delete(selected_entry)
    db.session.commit()

    return make_response(selected_dog_park.to_dict(
        only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
    ))
    , 200)

############################################################
#########              Friendship Decorator
############################################################

def Friendship_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        data = request.json()
        current_user = User.query.filter(User.id == session['user_id']).one()
        sel_friend = User.query.filter(User.id == data['friend_id']).one()

        if sel_friend not in current_user.all_friends():
            ## add an entry in the pending_friends table

            new_pend_fr = Pending_Friendships(
                pend_friend_1_id = current_user.id,
                pend_friend_2_id = data['friend_id']
            )

            db.session.add(new_pend_fr)
            db.session.commit()

            ## Then send a response to the current user stating request sent
            ## and include the pending friend attribute

            resp_body = new_pend_fr.to_dict()
            resp_body['request_status'] = False

            return make_response(resp_body,201)
            
            ## Then check if other friend user is logged into application, if so
            ## send a response to the other user that has had their
            ## User Model Updated with an updated pending friend attribute
            ## and then process some sort of notification from that
            
            ## can maybe use socket.io to establish this connection?
            ## look into websockets and server-side events

            ## If Flask keeps track of all the possible app contexts on the backend somehwere
            ## we could maybe sort through those to find one in which 
            ## the session user id key matches the friend id
            ## and then work from there?
            pass

        elif data['request_status'] == True:

            ## grab friendship data from request
            ## remove any mention of each of these users from each of their
            ## pending friend request User Attributes
            ## then return func so that they can be added to friendship
            ## table below
            return func(*args, **kwargs)
        
        else:
            #This shouldn't ever trip but adding for redundancy
            return make_response({"error" : "You are already friends with this User!"}, 400)
    
    return wrapper_func

############################################################
#########              Friendship Views
############################################################

class Friendship(Resource):

    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()
        import ipdb;ipdb.set_trace()
        serialized_friends = [ef.to_dict(
            only = ('image', 'username', 'id')
        ) for ef in currentUser.all_friends()]        
        return make_response(serialized_friends,200)
    
    @Authentication_Decorator
    def post(self):

        data = request.get_json()
        current_user_id = session['user_id']
        newFriendship = Friends(
            friend_1_id = current_user_id,
            friend_2_id = data['friend_id']
        )

        db.session.add(newFriendship)
        db.session.commit()

        return make_response(newFriendship.to_dict(),201)

api.add_resource(Friendship, '/friends')

class Friendship_by_Id(Resource):

    def delete(self, id):
        import ipdb;ipdb.set_trace()
        try:
            sel_friendship = Friends.query.filter(Friends.id == id).one()
        except:
            return make_response({"error": "Friendship Not Found"},404)

        db.session.delete(sel_friendship)
        db.session.commit()

        return make_response({}, 204)
    
api.add_resource(Friendship_by_Id, '/friends/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
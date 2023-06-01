#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource


# Local imports
from config import app, db, api
from models import User, Dog, Visit, Dog_Park, Review

# Views go here!

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(
            [user.to_dict() for user in users],
            200
        )
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
        return make_response(
            user.to_dict(rules = ('dogs',)),
            200
        )
api.add_resource(UserById, '/users/<int:id>')


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
        except:
            return {'error': 'Must enter a valid username, password, and url'}, 404
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
            return make_response(
                user.to_dict(rules=('dogs','-_password',)),
                200
            )
        except:
            return {'error': 'Must enter a valid username and password'}, 404

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return session.get('user_id')
        
api.add_resource(Logout, '/logout')

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
                'reviews'
            )

        ) for dp in Dog_Park.query.all()
        ]

        return make_response(dog_parks, 200)
    
    def post(self):

        try:
            dogpark = Dog_Park(
            name = request.form['name'],
            amenities = request.form['amenities'],
            address = request.form['address'],
            rating = request.form['rating'],
            image = request.form['image']
            )
        except ValueError:
            response_body = {'message':'hey u goofed put in a valid url pls'}
            return make_response(response_body, 409)
        else:
            db.session.add(dogpark)
            db.session.commit()
            return make_response(dogpark.to_dict(), 201)
    
api.add_resource(Dog_Parks, '/dogparks')
        
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

class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 201)
    
    def post(self):

        try:
            data = request.get_json()
            new_review = Review(
                name = data['name'],
                comment = data['comment'],
                rating = data['rating'],
                dog_park_id = data['dog_park_id'],
            )
        except:
            
            response_body = {'message': 'Hey you goober, enter between 1-5'}
            return make_response(response_body, 409)

        else:
            db.session.add(new_review)
            db.session.commit()
            return make_response(
            new_review.to_dict(),
            201 
        )

api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

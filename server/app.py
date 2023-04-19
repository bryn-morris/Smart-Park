#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Dog, Visit, Dog_Park

# Views go here!

class Dog_Parks(Resource):
    def get(self):

        dog_parks = [dp.to_dict(
            only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image'
            )

        ) for dp in Dog_Park.query.all()
        ]

        return make_response(dog_parks, 200)
    
    def post(self):
        data = request.get_json()
        dogpark = Dog_Park(
            name = data['name'],
            amenities = data['amenities'],
            address = data['address'],
            rating = data['rating'],
            image = data['image']
            )
        db.session.add(dogpark)
        db.session.commit()
        return make_response(dogpark.to_dict(), 201)
    
api.add_resource(Dog_Parks, '/dogparks')
        
class Dogs(Resource):
    def get(self):
        dogs = Dog.query.all()

        return make_response(
            [dog.to_dict(rules = ('user',)) for dog in dogs],
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

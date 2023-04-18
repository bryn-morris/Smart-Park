#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
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
        


if __name__ == '__main__':
    app.run(port=5555, debug=True)

from flask import make_response, request, Blueprint
from flask_restful import Resource

from auth_middleware import Admin_Authentication_Decorator
from config import db, api, app
from models.models import Dog_Park

dog_park_routes = Blueprint('dog_park_routes', __name__,)

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
            response_body = {'error':'hey u goofed put in a valid url pls'}
            return make_response(response_body, 409)
        else:
            db.session.add(dogpark)
            db.session.commit()
            return make_response(dogpark.to_dict(), 201)
    
api.add_resource(Dog_Parks, '/dogparks')

@app.route('/dogparks/<int:id>', methods = ['DELETE', 'PATCH'], endpoint = "dog_park_by_id")
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
    
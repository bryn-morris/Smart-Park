from flask import make_response, request, Blueprint
from flask_restful import Resource

from auth_dec import Admin_Authentication_Decorator
from config import db, api, app
from models import Dog_Park, Visit, Dog

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
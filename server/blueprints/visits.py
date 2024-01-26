from flask import Blueprint, request, make_response, session, g
from flask_restful import Resource
from models.models import Visit, Dog, Dog_Park
from models.user import User
from config import db, api, app
from datetime import datetime

from helpers.datetime_converter import convert_datetime

visit_routes = Blueprint('visit_routes', __name__)

class Check_In_Status_By_User(Resource):
    def get(self):
        
        currentUser = g.current_user

        dog_id_list = [dog.id for dog in currentUser.dogs]
        # Grab the most recent visit entry associated with the logged in user
        most_recent_visit = (Visit.query.filter(
            Visit.dogs_id.in_(dog_id_list)
        ).order_by(Visit.created_at.desc())
        .distinct(Visit.id)
        .limit(1)
        .one())

        if most_recent_visit.actual_length_of_stay:
            return make_response({}, 202)

        return make_response({
            'check_in_ID':most_recent_visit.id
        },200)

api.add_resource(Check_In_Status_By_User, '/check_in_status')

class Recent_Parks(Resource):
    def get(self):
        
        currentUser = g.current_user
        
        serialized_recent_visits = [
            {
                'date_of_visit' : convert_datetime(entry['date_of_visit']),
                'id' : entry['dog_park_data'].id,
                'name' : entry['dog_park_data'].name,
                'image' : entry['dog_park_data'].image
            } for entry in currentUser.recent_parks()
        ]

        return make_response(serialized_recent_visits, 200)

api.add_resource(Recent_Parks, '/recent_parks')

class Check_In_To_Park(Resource):

    def post(self):

        newVisit = Visit(
            length_of_stay = request.get_json()['lengthOfStay'].replace(' min',''),
            dogs_id = Dog.query.filter(Dog.name == request.get_json()['dogName']).one().id,
            dog_parks_id = Dog_Park.query.filter(Dog_Park.name == request.get_json()['dogParkName']).one().id,
        ) 
        db.session.add(newVisit)
        db.session.commit()

        response_dict = {
            'id' : newVisit.id,
            'newVisit' : {
                 'date_of_visit' : convert_datetime(newVisit.created_at),
                 'id' : newVisit.dog_park.id,
                 'name' : newVisit.dog_park.name,
                 'image' : newVisit.dog_park.image,
            },
        }

        return make_response(response_dict, 201)
    
api.add_resource(Check_In_To_Park, '/visits')

@app.route('/visits/<int:id>', methods = ['DELETE', 'PATCH'], endpoint = "visit_by_id")

def visit_by_id(id):

    selVisit = Visit.query.filter(Visit.id == id).one()

    if request.method == 'DELETE':

        response_body = {
            'park_id' : selVisit.dog_park.id
        }
        
        db.session.delete(selVisit)
        db.session.commit()

        return make_response(response_body, 200)
    
    if request.method == 'PATCH':

        request_timestamp = datetime.utcnow()
        delta_datetime = request_timestamp - selVisit.created_at

        selVisit.actual_length_of_stay = (int(delta_datetime.total_seconds()))
        
        db.session.add(selVisit)
        db.session.commit()

        return make_response(selVisit.to_dict(), 200)
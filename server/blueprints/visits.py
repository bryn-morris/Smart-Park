from flask import Blueprint, request, make_response, session
from flask_restful import Resource
from models.models import Visit, Dog, Dog_Park
from models.user import User
from config import db, api, app
from auth_dec import Authentication_Decorator
from datetime import datetime

from helpers.datetime_converter import convert_datetime

visit_routes = Blueprint('visit_routes', __name__)

class Check_In_Status_By_User(Resource):
    @Authentication_Decorator
    def get(self):

        currentUser = User.query.filter(
            User.id == session['user_id']
        ).one()

        # Grab the most recent visit entry associated with the logged in user
        most_recent_visit = currentUser.recentParks()[0]

        # If that entry does NOT have an actual_time_of_visit value, or if that value is null
        # they must still be checked in, and never checked out
        # return the visit id value to update localStorage to the server value

        if most_recent_visit.actual_length_of_stay:
            return make_response({
                'checkInID':most_recent_visit.id
            },200)

        ## If entry DOES have actual_time_of_visit value,
        ## return 204 response code (No Content to return)
        ## frontend will check and act accordingly

        return make_response({}, 204)


api.add_resource(Check_In_Status_By_User, '/check_in_status')

class Recent_Parks(Resource):
    @Authentication_Decorator
    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()
        
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
    @Authentication_Decorator
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
@Authentication_Decorator
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
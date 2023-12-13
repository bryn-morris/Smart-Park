from flask import Blueprint, request, make_response, session
from flask_restful import Resource
from models.models import Visit, Dog, Dog_Park
from models.user import User
from config import db, api, app
from auth_dec import Authentication_Decorator

visit_routes = Blueprint('visit_routes', __name__)

class Recent_Parks(Resource):
    @Authentication_Decorator
    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()
        
        serialized_recent_visits = [
            {
                'date_of_visit' : entry['date_of_visit'],
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
        return make_response(newVisit.to_dict(), 200)
    
api.add_resource(Check_In_To_Park, '/visits')

@app.route('/visits/<int:id>', methods = ['DELETE', 'PATCH'], endpoint = "visit_by_id")
@Authentication_Decorator
def visit_by_id(id):

    selVisit = Visit.query.filter(Visit.id == id).one()

    if request.method == 'DELETE':

        db.session.delete(selVisit)
        db.session.commit()

        import ipdb;ipdb.set_trace()

        return make_response({}, 200)
    
    if request.method == 'PATCH':

        selVisit.actual_length_of_stay = request.get_json()['actualLengthOfStay']
        
        db.session.add(selVisit)
        db.session.commit()

        return make_response(selVisit.to_dict(), 200)
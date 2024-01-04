from flask import Blueprint, make_response, request, session
from flask_restful import Resource

from config import api, db
from models.user import User

auth_views = Blueprint('auth_views', __name__, url_prefix="/auth")

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

            user = User.query.filter(User.username == data['username']).first()

            session['user_id'] = user.id
            
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

            user = User.query.filter(User.username == data['username']).first()

            if not user.authenticate(data['password']):
                raise ValueError
            

            session['user_id'] = user.id

            resp = make_response(
                user.to_dict(rules=('dogs','-_password','reviews','reviews.dog_park','-favorited',)),
                200
            )

            return resp
        except:
            return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):

        session.clear()

        response = make_response({}, 200)
        response.set_cookie('session', '', expires=0)

        return response
api.add_resource(Logout, '/logout')
from flask import Blueprint, make_response, request, session
from flask_restful import Resource

from config import api, db
from models import (
    User,
)

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
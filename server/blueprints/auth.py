from flask import Blueprint, make_response, request, session
from flask_restful import Resource
from flask_jwt_extended import create_access_token, unset_jwt_cookies

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

            # user = User.query.filter(User.username == data['username']).one_or_none()
            new_filtered_user = new_user.to_dict(rules=('dogs','-_password',))
            # session['user_id'] = user.id
            response = make_response(new_filtered_user,200)

            jwt_access_token = create_access_token(identity=new_filtered_user)
            response.headers['Authorization'] = f'Bearer {jwt_access_token}'
            
            return response
        except:
            return {'error': 'Must enter a valid username, password, and image url'}, 401
            
    
api.add_resource(Signup, '/signup')
        
class Login(Resource):
    
    def post(self):
        
        try:
            data = request.get_json()

            user = User.query.filter(User.username == data['username']).first()

            filtered_user =  user.to_dict(rules=('dogs','-_password','reviews','reviews.dog_park','-favorited',))
            
            if not user.authenticate(data['password']):
                raise ValueError

            # session['user_id'] = user.id

            resp = make_response(filtered_user, 200)

            jwt_access_token = create_access_token(identity=filtered_user)

            resp.headers['Authorization'] = f'Bearer {jwt_access_token}'

            return resp
        except:
            return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):

        session.clear()

        response = make_response({}, 200)
        unset_jwt_cookies(response)
        # response.set_cookie('session', '', expires=0)

        return response
api.add_resource(Logout, '/logout')
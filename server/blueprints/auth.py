from flask import Blueprint, make_response, request, session, g
from flask_restful import Resource
from flask_jwt_extended import create_access_token, unset_jwt_cookies, create_refresh_token
import datetime


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

            user = User.query.filter(User.username == data['username']).one_or_none()
            
            # session['user_id'] = user.id
            response = make_response(new_user.to_dict(rules=('dogs','-_password',)),200)

            jwt_access_token = create_access_token(identity=user.id)
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

            if not user.authenticate(data['password']):
                raise ValueError

            # session['user_id'] = user.id

            resp = make_response(user.to_dict(rules=('dogs','-_password','reviews','reviews.dog_park','-favorited',)), 200)

            jwt_access_token = create_access_token(identity=user.id)

            resp.headers['Authorization'] = f'Bearer {jwt_access_token}'

            return resp
        except:
            return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):

        # session.clear()

        # set JWT expiry time to zero to immediately invalidate it
        immediate_expiry_time = datetime.timedelta(seconds=0)
        new_token=create_refresh_token(
            g.current_user.id, 
            expires_delta=immediate_expiry_time
        )

        response = make_response({}, 200)
        response.headers['Authorization'] = f'Bearer ${new_token}'

        # Currently not using cookies
        # unset_jwt_cookies(response)
        # response.set_cookie('session', '', expires=0)

        return response
api.add_resource(Logout, '/logout')
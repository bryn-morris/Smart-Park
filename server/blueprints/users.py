from flask import make_response, Blueprint
from flask_restful import Resource

from models import User
from config import api

user_routes = Blueprint('user_routes', __name__)

class Users(Resource):

    def get(self):

         serialized_users = [user.to_dict(only = (
              'username', 'id', 'image', 'dogs.name'
         )) for user in User.query.all()]

         return make_response(serialized_users, 200)
    
api.add_resource(Users, '/users')


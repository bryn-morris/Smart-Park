from flask import make_response, session, request, Blueprint, jsonify
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity

from config import db, api
from models.user import User
from auth_middleware import Authentication_Decorator

friendship_routes = Blueprint('friendship_routes', __name__)

class Friendship(Resource):

    # @Authentication_Decorator
    def get(self):
        import ipdb;ipdb.set_trace()
        currentUser = User.query.filter(User.id == session['user_id']).one()

        serialized_friendships = [
            {
                'request_metadata': 
                    {
                     'friendship_id': fe['friendship_id'], 
                    }
                ,
                'friend_data':
                    {
                        'image': fe['fo'].image,
                        'username' : fe['fo'].username,
                        'id' : fe['fo'].id,
                    }
                ,    
            } for fe in currentUser.all_friends(currentUser.id)
        ]
        
        return make_response(serialized_friendships,200)

api.add_resource(Friendship, '/friends')

class Pending_Friends(Resource):
    
    @Authentication_Decorator
    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()

        serialized_pending_friendships = [
            {
                'request_metadata': 
                    {'sender' : pfe['sender'],
                     'friendship_id': pfe['friendship_id'], 
                    }
                ,
                'friend_data':
                    {
                        'image': pfe['pfo'].image,
                        'username' : pfe['pfo'].username,
                        'id' : pfe['pfo'].id,
                    }
                ,    
            } for pfe in currentUser.pending_friends(currentUser.id) if currentUser.pending_friends(currentUser.id)
        ]
        return make_response(serialized_pending_friendships, 200)

api.add_resource(Pending_Friends, '/pending_friends')
from flask import make_response, Blueprint, jsonify, g
from flask_restful import Resource

from config import  api
from models.user import User

friendship_routes = Blueprint('friendship_routes', __name__)

class Friendship(Resource):

    def get(self):

        currentUser = g.current_user

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
    
    def get(self):

        currentUser = g.current_user

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
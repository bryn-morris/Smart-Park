from flask import make_response, session, request, Blueprint, jsonify
from flask_restful import Resource

from config import db, api
from models import User, Friends
from auth_dec import Authentication_Decorator

friendship_routes = Blueprint('friendship_routes', __name__)

class Friendship(Resource):

    def get(self):
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

class Friendship_by_Id(Resource):

    def delete(self, id):
        import ipdb;ipdb.set_trace()
        try:
            sel_friendship = Friends.query.filter(Friends.id == id).one()
        except:
            return make_response({"error": "Friendship Not Found"},404)

        db.session.delete(sel_friendship)
        db.session.commit()

        return make_response({}, 204)

api.add_resource(Friendship_by_Id, '/friends/<int:id>')

class Pending_Friends(Resource):
    
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
            } for pfe in currentUser.pending_friends(currentUser.id)
        ]
        return make_response(serialized_pending_friendships, 200)

api.add_resource(Pending_Friends, '/pending_friends')
from flask import make_response, session, request, Blueprint, jsonify
from flask_restful import Resource

from config import db, api
from models import User, Friends
from auth_dec import Authentication_Decorator

friendship_routes = Blueprint('friendship_routes', __name__)

class Friendship(Resource):

    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()

        # create a sender key value pair where the value
        # is sender and the value is a boolean equivalency checking
        # to see if the currentUser.id == pendingFriend.pend_friend_1_id
        # Repeat across applictation

        serialized_friends = [ef.to_dict(
            only = ('image', 'username', 'id')
        ) for ef in currentUser.all_friends()]
        return make_response(serialized_friends,200)
    
    @Authentication_Decorator
    def post(self):

        data = request.get_json()
        current_user_id = session['user_id']
        newFriendship = Friends(
            friend_1_id = current_user_id,
            friend_2_id = data['friend_id']
        )

        db.session.add(newFriendship)
        db.session.commit()

        return make_response(newFriendship.to_dict(),201)

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
                'image': pfe['pfo'].image,
                'username' : pfe['pfo'].username,
                'id' : pfe['pfo'].id,
                'sender' : pfe['sender'],
            } for pfe in currentUser.pending_friends()
        ]
        return make_response(serialized_pending_friendships, 200)

api.add_resource(Pending_Friends, '/pending_friends')
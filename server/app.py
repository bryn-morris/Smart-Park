#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api, socketio
from auth_dec import Authentication_Decorator
from blueprints.review import review_routes
from blueprints.auth import auth_views
from blueprints.dog_parks import dog_park_routes
from blueprints.dogs import dog_routes
from models import (
    User, 
    Dog, 
    Friends,
    Pending_Friendships,
)

# Registering Routing for Blueprints
app.register_blueprint(review_routes)

app.register_blueprint(auth_views)

app.register_blueprint(dog_park_routes)

app.register_blueprint(dog_routes)

# class Users(Resource):
#     def get(self):
#         users = User.query.all()
#         return make_response(
#             [user.to_dict() for user in users],
#             200
#         )
# api.add_resource(Users, '/users')

# class UserById(Resource):
#     def get(self, id):
#         user = User.query.filter_by(id=id).first()
#         if not user:
#             return make_response(
#                 {'error': 'User not found'},
#                 404
#             )
#         return make_response(
#             user.to_dict(rules = ('dogs',)),
#             200
#         )
# api.add_resource(UserById, '/users/<int:id>')

############################################################
#########              Friendship Decorator
############################################################

def Friendship_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        data = request.json()
        current_user = User.query.filter(User.id == session['user_id']).one()
        sel_friend = User.query.filter(User.id == data['friend_id']).one()

        if sel_friend not in current_user.all_friends():
            ## add an entry in the pending_friends table

            new_pend_fr = Pending_Friendships(
                pend_friend_1_id = current_user.id,
                pend_friend_2_id = data['friend_id']
            )

            db.session.add(new_pend_fr)
            db.session.commit()

            ## Then send a response to the current user stating request sent
            ## and include the pending friend attribute

            resp_body = new_pend_fr.to_dict()
            resp_body['request_status'] = False

            return make_response(resp_body,201)
            
            ## Then check if other friend user is logged into application, if so
            ## send a response to the other user that has had their
            ## User Model Updated with an updated pending friend attribute
            ## and then process some sort of notification from that
            
            ## can maybe use socket.io to establish this connection?
            ## look into websockets and server-side events

            ## If Flask keeps track of all the possible app contexts on the backend somehwere
            ## we could maybe sort through those to find one in which 
            ## the session user id key matches the friend id
            ## and then work from there?
            pass

        elif data['request_status'] == True:

            ## grab friendship data from request
            ## remove any mention of each of these users from each of their
            ## pending friend request User Attributes
            ## then return func so that they can be added to friendship
            ## table below
            return func(*args, **kwargs)
        
        else:
            #This shouldn't ever trip but adding for redundancy
            return make_response({"error" : "You are already friends with this User!"}, 400)
    
    return wrapper_func

############################################################
#########              Friendship Views
############################################################

class Friendship(Resource):

    def get(self):
        currentUser = User.query.filter(User.id == session['user_id']).one()
        # import ipdb;ipdb.set_trace()
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

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)
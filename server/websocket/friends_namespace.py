from flask_socketio import Namespace

class FriendNamespace(Namespace):
    def on_connect(self):
        self.emit('connection_confirm', {'message': 'Sucessfully Connected to Friend NameSpace Websocket'})

    def on_disconnect(self):
        self.emit('connection_confirm', {'message': 'Sucessfully Disconnected from Friend NameSpace Websocket'})

    def on_friend_request(self):
        # websocket friend request logic, will likely
        # need to add more arguments here
        # this handles "/friend_request" events as flask-socketio follows event nomenclature following the on_ keyphrase

        ## First, User A will send Friend Request to User B
        ## This will to add both users to pending friendships table
        ## If a socketio room exists with User B (if User B is logged in) emit event will be sent to user B
        ## User B can accept or decline
        ### If User B declines, remove user from pending friendships table
        ### If User A cancels, remove users from pending friendships table
        ### If User B accepts, users will be removed from pending friendships table and be added to the friendships table
        ### Once Friendship is established, either user can delete friendship to remove from friendship table
        pass

############################################################
#########              Friendship Decorator
############################################################

# from flask import make_response, request, session, jsonify
# from flask_restful import Resource

# from models import (
#     User, 
#     Pending_Friendships,
# )

# def Friendship_Decorator(func):

#     def wrapper_func(*args, **kwargs):
        
#         data = request.json()
#         current_user = User.query.filter(User.id == session['user_id']).one()
#         sel_friend = User.query.filter(User.id == data['friend_id']).one()

#         if sel_friend not in current_user.all_friends():
#             ## add an entry in the pending_friends table

#             new_pend_fr = Pending_Friendships(
#                 pend_friend_1_id = current_user.id,
#                 pend_friend_2_id = data['friend_id']
#             )

#             db.session.add(new_pend_fr)
#             db.session.commit()

#             ## Then send a response to the current user stating request sent
#             ## and include the pending friend attribute

#             resp_body = new_pend_fr.to_dict()
#             resp_body['request_status'] = False

#             return make_response(resp_body,201)
            
#             ## Then check if other friend user is logged into application, if so
#             ## send a response to the other user that has had their
#             ## User Model Updated with an updated pending friend attribute
#             ## and then process some sort of notification from that
            
#             ## can maybe use socket.io to establish this connection?
#             ## look into websockets and server-side events

#             ## If Flask keeps track of all the possible app contexts on the backend somehwere
#             ## we could maybe sort through those to find one in which 
#             ## the session user id key matches the friend id
#             ## and then work from there?
#             pass

#         elif data['request_status'] == True:

#             ## grab friendship data from request
#             ## remove any mention of each of these users from each of their
#             ## pending friend request User Attributes
#             ## then return func so that they can be added to friendship
#             ## table below
#             return func(*args, **kwargs)
        
#         else:
#             #This shouldn't ever trip but adding for redundancy
#             return make_response({"error" : "You are already friends with this User!"}, 400)
    
#     return wrapper_func
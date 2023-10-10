from flask_socketio import Namespace
from flask import session
from config import db
from models import User, Pending_Friendships
from flask_socketio import (
    join_room, 
    leave_room,
    disconnect,
    close_room,
)

class FriendNamespace(Namespace):

    ## eventually will change user_id to uuid with postgres to make this 
    ## more secure, leaving code as is for later implementation

    def on_connect(self):

        if not session.get('user_id'):
            raise ValueError('Please relog! Unable to find user ID')
            # disconnect()

        self.room_name = f'{session.get("user_id")}'
        self.emit('connection_status', {'message': f'Sucessfully Connected to room {self.room_name}'})
        
        join_room(self.room_name)

    def on_start_disconnect(self):

        leave_room(self.room_name)
        close_room(self.room_name)
        if self.room_name:
            del self.room_name

        disconnect(session.get("user_id"))
        self.emit('friend_socket_disconnect')
        
    def on_error(self, e):
        ## May want to include what the error type is, so that action can be taken on the frontend
        self.emit('server_error_response', {'message':str(e)})

    # this handles "/friend_request" events as flask-socketio follows event nomenclature following the on_ keyphrase
    def on_friend_request(self, data):

        user_id = session.get('user_id')
        friend_id = data.get('friend_id')

        sel_friend = User.query.filter(User.id == friend_id).one()
        sel_user = User.query.filter(User.id == user_id).one()
        
        ### return error if user attempts to add someone who is already a friend as a friend  
        if sel_friend in sel_user.all_friends():
            raise ValueError('This user is already one of your friends!')
        
        ### return error if user attempts to add themselves as a friend
        if sel_friend == sel_user:
            raise ValueError('You can\'t add yourself as a friend!')

        ## First, User A will send Friend Request to User B
        ## This will to add both users to pending friendships table

        new_pend_fr = Pending_Friendships(
                pend_friend_1_id = user_id,
                pend_friend_2_id = friend_id
            )
        
        db.session.add(new_pend_fr)
        db.session.commit()

        ## HANDLE THIS WITH POSTGRES
        ## Add contraint to pending friendships table such that only one pairing can be present at a time, 
        ## in either direction, this will cause an error that will get picked up by the global on_error handler

        ## emit message to room of both users a and b that updates pending friend request state
        
        user_serialized_pending_friendships = [
            {
                'image': pfe['pfo'].image,
                'username' : pfe['pfo'].username,
                'id' : pfe['pfo'].id,
                'sender' : pfe['sender'],
            } for pfe in sel_user.pending_friends()
        ]
        
        friend_serialized_pending_friendships = [
            {
                'image': pfe['pfo'].image,
                'username' : pfe['pfo'].username,
                'id' : pfe['pfo'].id,
                'sender' : pfe['sender'],
            } for pfe in sel_friend.pending_friends()
        ]

        self.emit('friend_request_response',{"pend_friend_state" : user_serialized_pending_friendships}, room = self.room_name)
        self.emit('friend_request_response',{"pend_friend_state" : friend_serialized_pending_friendships}, room = f'{friend_id}')

        ## This sender value then determines how the corresponding frontends can
        ## Interact with the request. (If user A sends message -> sender = True, they cannot accept, 
        # but user B -> sender = False can accept)

        ## User B can accept or decline
        ### If User B declines, remove users from pending friendships table
        ### If User A cancels, remove users from pending friendships table
        ### If User B accepts, users will be removed from pending friendships table and be added to the friendships table
        ### Once Friendship is established, either user can delete friendship to remove from friendship table

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
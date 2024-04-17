from flask_socketio import Namespace
from flask import session, request
from config import db, redis_client
# import datetime
from models.models import Pending_Friendships, Friends
from models.user import User
from flask_jwt_extended import decode_token, create_access_token
from flask_socketio import (
    join_room, 
    leave_room,
    disconnect,
    close_room,
)
from helpers.auth_error import AuthError

class FriendNamespace(Namespace):

    ## eventually will change user_id to uuid with postgres to make this 
    ## more secure, leaving code as is for later implementation

    def on_connect(self):

        # If a connection instance already exists, kill it

        tempAKey = request.args.get('token')

        if tempAKey:
            self.user_id = decode_token(tempAKey)['sub']
            cached_auth_token = redis_client.get(f"user_{self.user_id}_jwt_access_token")
        
        # compare against aKey in redis
        if cached_auth_token != tempAKey:
            raise AuthError('Authentication Error! Please reach out to Admin')

        # proceed with generating more resilient key with longer expiry time
        resilient_aKey = create_access_token(
            identity = self.user_id, 
            # should be using the expiry timeline listed in config.py
            # expires_delta = datetime.timedelta(minutes=10)
        )
        # overwrite redis aKey entry
        redis_client.set(f"user_{self.user_id}_jwt_access_token", resilient_aKey)
        
        # then pass that back through server emission

        self.room_name = f'{session.get("user_id")}'
        join_room(self.room_name)
        
        self.emit('connection_status', {
            # 'message': f'Sucessfully Connected to room {self.room_name}',
            'aKey' : resilient_aKey,
        }, room = self.room_name)
        
    def on_start_disconnect(self):

        # wipe redis key for this user
        redis_client.set(f"user_{self.user_id}_jwt_access_token", None)

        leave_room(self.room_name)
        close_room(self.room_name)
        if self.room_name:
            del self.room_name

        disconnect(session.get("user_id"))
        self.emit('friend_socket_disconnect')
        
    def on_error(self, e):
        ## May want to include what the error type is, so that action can be taken on the frontend
        self.emit('server_error_response', {'message':str(e)})

    def on_friend_request(self, data):

        # auth_ws_connection()

        user_id = session.get('user_id')
        friend_id = data.get('friend_id')

        sel_friend = User.query.filter(User.id == friend_id).one()
        sel_user = User.query.filter(User.id == user_id).one()
        
        ### return error if user attempts to add someone who is already a friend as a friend  
        if sel_friend in sel_user.all_friends(sel_user.id):
            raise ValueError('This user is already one of your friends!')
        
        ### return error if user attempts to add themselves as a friend
        if sel_friend == sel_user:
            raise ValueError('You can\'t add yourself as a friend!')

        ## return error if user is already in pending friends list
        if sel_friend in sel_user.pend_friends_1.all() or sel_friend in sel_user.pend_friends_2.all():
            raise ValueError('You have already sent a friend request to this user!')

        new_pend_fr = Pending_Friendships(
                pend_friend_1_id = user_id,
                pend_friend_2_id = friend_id
            )
        
        db.session.add(new_pend_fr)
        db.session.commit()

        ## emit message to room of both users a and b that updates pending friend request state
        
        user_serialized_pending_friendships = [
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
            } for pfe in sel_user.pending_friends(sel_user.id) if sel_user.pending_friends(sel_user.id)
        ]
        
        friend_serialized_pending_friendships = [
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
            } for pfe in sel_friend.pending_friends(sel_friend.id) if sel_friend.pending_friends(sel_friend.id)
        ]

        if user_serialized_pending_friendships:
            self.emit('friend_request_response',{"config_key": "request_response","pend_friend_state" : user_serialized_pending_friendships}, room = self.room_name)
        if friend_serialized_pending_friendships:
            self.emit('friend_request_response',{"config_key": "request_response","pend_friend_state" : friend_serialized_pending_friendships}, room = f'{friend_id}')

    def on_delete_request(self, data):

        # auth_ws_connection()

        user_id = session.get('user_id')
        friend_id = data.get('friend_id')

        sel_friend = User.query.filter(User.id == friend_id).one()

        try:
            sel_friendship = Friends.query.filter(Friends.id == data['friendship_id']).first()
        except:
            raise ValueError('Unable to locate friendship!')

        db.session.delete(sel_friendship)
        db.session.commit()

        sel_user = User.query.filter(User.id == user_id).one()

        user_serialized_friendships = [
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
            } for fe in sel_user.all_friends(user_id) if sel_user.all_friends(user_id)
        ]
    
        friend_serialized_friendships = [
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
            } for fe in sel_friend.all_friends(sel_friend.id) if sel_friend.all_friends(sel_friend.id)
        ]

        self.emit('friend_request_response',{"config_key": "friend_delete_response","friend_state" : user_serialized_friendships}, room = self.room_name)
        self.emit('friend_request_response',{"config_key": "friend_delete_response","friend_state" : friend_serialized_friendships}, room = f'{friend_id}')  

    def on_accept_friend_request(self, data):

        # auth_ws_connection()

        pass
    ## User B (sender -> False )can accept or decline
    ## send packet containing sender value so backend can check
    ### If User B accepts, users will be removed from pending friendships table and be added to the friendships table
    ### Once Friendship is established, either user can delete friendship to remove from friendship table
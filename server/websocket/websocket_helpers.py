from flask_socketio import join_room, leave_room, close_room, disconnect
from models import WebSocket_Rooms, User
from config import db

class WebSocketAuthenticationError(Exception):
    
    def __init__(self, message, status_code=404):
        super().__init__(message)
        self.status_code = status_code

def join_user_to_room(self):
    
    self.room_name = f'user_{self.user_id}'
    join_room(self.room_name)

    if not WebSocket_Rooms.query.filter_by(room_name=self.room_name).first():
        self.active_room = WebSocket_Rooms(room_name = self.room_name, user_id = self.user_id)
        db.session.add(self.active_room)
        db.session.commit() 

def emit_message_to_room(self, event_name, data_dict, friend_room_name, ):

    self.emit(event_name, data_dict, room = friend_room_name)

def remove_user_from_room(self):

    if self.active_room.user == User.query.filter(User.id == self.user_id).first():
        leave_room(self.room_name)
    else:
        raise WebSocketAuthenticationError("User is not associated with this room within the db!")
        
def close_room(self):

    # close websocket room
    close_room(self.room_name)

    ## remove entry from db
    db.session.delete(self.active_room)
    db.session.commit()

    ## remove namespace instance variables
    if self.room_name and self.active_room:
        del self.room_name
        del self.active_room

def disconnect_user(self):

    # Shouldn't need to specify the user_id as it should be grabbed from the request context
    disconnect()

    if self.user_id:
        del self.user_id
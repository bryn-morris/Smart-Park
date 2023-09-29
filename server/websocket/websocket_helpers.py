from flask_socketio import join_room, leave_room, close_room
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
        try:
            self.active_room = WebSocket_Rooms(room_name = self.room_name, user_id = self.user_id)
            db.session.add(self.active_room)
            db.session.commit() 
        except:
            WebSocketAuthenticationError('Room name is not unique!')

def emit_message_to_room(self, event_name, data_dict):

    if not self.room_name:
        raise WebSocketAuthenticationError('No websocket room exists for this user!')

    self.emit(event_name, data_dict, room = self.room_name)

def remove_user_from_room(self):

    if self.active_room and self.active_room.user == User.query.filter(User.id == self.user_id).first():
        leave_room(self.room_name)
        
def close_room(self):

    if self.active_room:

        # close websocket room
        close_room(self.room_name)

        ## remove entry from db
        db.session.delete(self.active_room)
        db.session.commit()

        ## remove namespace instance variables
        del self.room_name
        del self.active_room
    else:
        WebSocketAuthenticationError("Cannot locate room to close!")

def diconnect_user(self):

    if self.user_id:
        del self.user_id
    else:
        raise WebSocketAuthenticationError('Cannot locate user to disconnect!')
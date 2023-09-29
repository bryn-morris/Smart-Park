from flask_socketio import join_room, leave_room, close_room
from models import WebSocket_Rooms, User
from config import db

class WebSocketAuthenticationError(Exception):
    
    def __init__(self, message, status_code=404):
        super().__init__(message)
        self.status_code = status_code

def check_rooms(room_name):

    return WebSocket_Rooms.query.filter_by(room_name=room_name).first()

def join_user_to_room(self, user_id):
    
    self.room_name = f'user_{user_id}'
    join_room(self.room_name)

    if not check_rooms(self.room_name):
        try:
            self.active_room = WebSocket_Rooms(room_name = self.room_name, user_id = user_id)
            db.session.add(self.active_room)
            db.session.commit() 
        except:
            WebSocketAuthenticationError('Room name is not unique!')

def emit_message_to_room(self, event_name, data_dict, room_name):

    if not self.active_room:
        raise WebSocketAuthenticationError('No websocket room exists for this user!')

    self.emit(event_name, data_dict, room = self.active_room)

def remove_user_from_room(self, room_name, user_id):

    active_user = User.query.filter(User.id == user_id).first()

    if self.active_room and self.active_room.user == active_user:
        leave_room(room_name)
        
def close_room(self, room_name):

    if self.active_room:
        close_room(room_name)
        del self.room_id
        db.session.delete(self.active_room)
        db.session.commit()


def diconnect_user(user_id):
    ## del self.user_id
    pass
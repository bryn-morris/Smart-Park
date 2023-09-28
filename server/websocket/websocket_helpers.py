from flask_socketio import join_room
from models import WebSocket_Rooms

class WebSocketAuthenticationError(Exception):
    
    def __init__(self, message, status_code=404):
        super().__init__(message)
        self.status_code = status_code

def check_rooms(room_name):

    return WebSocket_Rooms.query.filter_by(room_name=room_name).first()

def emit_message_to_room(self, event_name, data_dict, room_name):
   
    active_room = check_rooms(room_name)

    if not active_room:
        raise WebSocketAuthenticationError('No websocket room exists for this user!')

    self.emit(event_name, data_dict, room = active_room)

def join_user_to_room(user_id):

    join_room(f'user_{user_id}')

def remove_user_from_room():
    ## check to see if room exists within active room database
    ## check to see if user is associated with that room
    ## if both are true, remove the user from the room 
    pass

def close_room():
    ## check to make sure room exists within active room database
    ## if so, close room
    pass
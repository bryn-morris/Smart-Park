from flask_socketio import join_room
from models import WebSocket_Rooms

class WebSocketAuthenticationError(Exception):
    
    def __init__(self, message, status_code=404):
        super().__init__(message)
        self.status_code = status_code

def check_rooms(room_name):

    active_room = WebSocket_Rooms.query.filter_by(room_name=room_name).first()

    if not active_room:
        raise WebSocketAuthenticationError('No websocket room exists for this user!')
        
    return active_room

def emit_message_to_room(self, event_name, data_dict, room_name):
   
    self.emit(event_name, data_dict, room= check_rooms(room_name))

def join_user_to_room(user_id):
    ## Query database to grab a list of all of the active rooms
    
    ## if room does not exist within that list of rooms
    ## create a new room and add a user to it
    # join_room(f'user_{user_id}')
    ## if room does exist, add user to the room in question
    pass

def remove_user_from_room():
    ## check to see if room exists within active room database
    ## check to see if user exists
    ## if both are true, remove the user from the room 
    pass

def close_room():
    ## check to make sure room exists within active room database
    ## if so, close room
    pass
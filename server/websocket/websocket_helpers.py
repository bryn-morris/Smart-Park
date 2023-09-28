from flask_socketio import join_room
from models import WebSocket_Rooms

class AuthenticationError(Exception):
    
    def __init__(self, message, status_code=401):
        super().__init__(message)
        self.status_code = status_code

def check_rooms(room_name):
    ## using.first() so that if no room is found, return value is none
    return WebSocket_Rooms.query.filter_by(room_name=room_name).first()

def emit_message_to_room_if_logged_in(self_instance, event_name, message, room_name):
    
    active_room = check_rooms(room_name)

    if active_room:
         self_instance.emit(event_name, {'message': message}, room=active_room.room_name)
    else:
        raise AuthenticationError('No websocket room exists for this user!')
   

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
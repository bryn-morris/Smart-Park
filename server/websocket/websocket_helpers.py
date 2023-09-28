from flask_socketio import join_room
from models import WebSocket_Rooms
from flask import session

def check_rooms(room_name):
    ## using.first() so that if no room is found, return value is none
    room = WebSocket_Rooms.query.filter_by(room_name=room_name).first()
    return room

def emit_message_to_room_if_logged_in(self_instance, event_name, message, room_name):

    # check to see if we can access session here, and if so, check to make sure session has
    ## data before logging in
    # import ipdb;ipdb.set_trace()
    active_room = check_rooms(room_name)

    if active_room:
         self_instance.emit(event_name, {'message': message}, room=active_room.room_name)
    else:
        ## will need to send message to frontend to sign currentUser out and force re-log
        raise ValueError('No websocket room exists for this user!')
   

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
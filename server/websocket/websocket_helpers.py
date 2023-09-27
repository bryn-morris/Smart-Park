from flask_socketio import join_room

def emit_message_to_room_if_logged_in(self_instance, event_name, message, room_name):
    ## If room exists within the active rooms database, send message to the relevant room
    ## maybe check session to see if user exists instead of pulling from websocket message
    self_instance.emit(event_name, {'message': message}, room=room_name)

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
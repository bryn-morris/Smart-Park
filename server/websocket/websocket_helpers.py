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
    
    room_name = f'user_{user_id}'

    self.room_name = room_name

    join_room(room_name)

    ## if room doesn't already exist in db, add to db
    if not check_rooms(room_name):

        try:
            db.session.add(WebSocket_Rooms(room_name = room_name, user_id = user_id))
            db.session.commit()
        except:
            WebSocketAuthenticationError('Room name is not unique!')

def emit_message_to_room(self, event_name, data_dict, room_name):
   
    ## add room_name to self.room_name
    active_room = check_rooms(room_name)

    if not active_room:
        raise WebSocketAuthenticationError('No websocket room exists for this user!')

    self.emit(event_name, data_dict, room = active_room)

def remove_user_from_room(room_name, user_id):

    active_room = check_rooms(room_name)
    active_user = User.query.filter(User.id == user_id).first()

    if active_room and active_room.user == active_user:
        leave_room(room_name)
        

def close_room(room_name):

    if check_rooms(room_name):
        close_room(room_name)
    
    ## del self.room_id
    ## check to make sure room exists within active room database
    ## if so, close room and delete from database
    pass

def diconnect_user(user_id):
    ## del self.user_id
    pass
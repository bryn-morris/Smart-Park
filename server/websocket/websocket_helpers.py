from flask_socketio import join_room, leave_room, close_room
from models import WebSocket_Rooms, User

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

def remove_user_from_room(room_name, user_id):

    active_room = check_rooms(room_name)
    active_user = User.query.filter(User.id == user_id).first()

    if active_room and active_room.user == active_user:
        leave_room(room_name)
        

def close_room(room_name):

    if check_rooms(room_name):
        close_room(room_name)
    ## check to make sure room exists within active room database
    ## if so, close room and delete from database
    pass

def diconnect_user(user_id):
    pass
from flask import request

## If project scales up, will likely want to move 
# this functionality to database calls and queries

## Websocket Manager Mapping
ws_manager_mapping = {
    "/friends-socket": {},
    "/chat-socket": {},
}

def add_to_wsmanager(user_id):
    ws_manager_mapping[request.namespace][f"user_{user_id}"] = request.sid

def remove_from_wsmanager(user_id):
    del ws_manager_mapping[request.namespace][f"user_{user_id}"]

def validate_ws_instance(self, user_id):
    if f"user_{user_id}" in ws_manager_mapping[request.namespace]:
        self.on_start_disconnect()

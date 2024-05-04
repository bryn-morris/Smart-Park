from flask import request
from config import redis_client
from flask_jwt_extended import decode_token, create_access_token

def auth_ws_connection(self) :

    tempAKey = request.args.get('token')

    if tempAKey:
        self.user_id = decode_token(tempAKey)['sub']
        cached_auth_token = redis_client.get(f"user_{self.user_id}_jwt_access_token")
    
    # compare against aKey in redis
    if cached_auth_token != tempAKey:
        
        self.emit("connect_error", 
            'Authentication Error! Please Relog! If Issue Persists, Reach out to Admin'
        ,room = self.room_name)

    # Resilient key with longer expiry time
    resilient_aKey = create_access_token(
        identity = self.user_id, 
    )
    # overwrite redis aKey entry
    redis_client.set(f"user_{self.user_id}_jwt_access_token", resilient_aKey)
    
    self.emit('connection_status', {
        # 'message': f'Sucessfully Connected to room {self.room_name}',
        'aKey' : resilient_aKey,
    }, room = self.room_name)
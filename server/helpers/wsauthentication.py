from flask import request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from config import redis_client
from flask_socketio import disconnect

# def auth_ws_connection() : 
#     if not session.get('user_id'):
#         raise ValueError('Please relog! Unable to find user ID')
#         # disconnect()

def auth_ws_connection() :

    authToken = request.headers.get('Authorization')

    import ipdb;ipdb.set_trace()

    try:

        ## flask_jwt_extended and websocket may not be compatible with each other
        ## verify_jwt_in_request is not detecting the JWT
        ## RuntimeError: You must call `@jwt_required()` or `verify_jwt_in_request()` before using this method
        if verify_jwt_in_request():

            user_id = get_jwt_identity()
            cached_auth_token = redis_client.get(f"user_{user_id}_jwt_access_token")
    
        
    except:
        disconnect(user_id)
        raise ValueError('Please relog! Unable to locate user')
    
    if not verify_jwt_in_request() or authToken != cached_auth_token:
        disconnect(user_id)
        raise ValueError('Please relog! Unable to locate user')
    
    ## compare agains the token stored in redis
    # token named : "user_{user.id}_jwt_access_token"

    # if authToken != redis.get("user_{user.id}_jwt_access_token")
    
    # if true:
        # proceed
    
    # if false:
        # Authentication error, handle on frontend

    pass
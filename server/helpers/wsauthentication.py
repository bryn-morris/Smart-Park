from flask import request

# def auth_ws_connection() : 
#     if not session.get('user_id'):
#         raise ValueError('Please relog! Unable to find user ID')
#         # disconnect()

def auth_ws_connection() :

    authToken = request.headers.get('Authorization')
    
    ## compare agains the token stored in redis
    # token named : "user_{user.id}_jwt_access_token"

    # if authToken != redis.get("user_{user.id}_jwt_access_token")
    
    # if true:
        # proceed
    
    # if false:
        # Authentication error, handle on frontend

    pass
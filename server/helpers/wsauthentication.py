from flask import session

def auth_ws_connection() : 
    if not session.get('user_id'):
        raise ValueError('Please relog! Unable to find user ID')
        # disconnect()
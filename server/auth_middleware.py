from models.user import User
from flask import session, make_response, request
from flask_jwt_extended import verify_jwt_in_request

def Admin_Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        sel_user = User.query.filter(session['user_id']==User.id).one()
        if sel_user.admin==False:
            return make_response({"error": "Authentication failed - User is not admin"},401)
        return func(*args, **kwargs)

    return wrapper_func

def Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):

        if not User.query.filter(session['user_id']==User.id).first():
            return make_response({"error":"User is not logged in!"}, 401)            

        return func(*args, **kwargs)

    return wrapper_func

def authenticate_user():

    ## skip authentication is login or signup route is pinged
    if request.endpoint in ['login', 'signup']:
        return
    
    ## check if JWT is valid
    if not verify_jwt_in_request():
        return make_response({"error": "Authentication failed - Please Log Back In"} ,401)
    
    ## decrypt secret to check validity of JWT in headers
    
    
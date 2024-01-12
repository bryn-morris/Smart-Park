from models.user import User
from config import app
from flask import session, make_response, request, g
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity

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

@app.before_request
def authenticate_user():

    public_views = [
        'login',
        'signup',
    ]
    
    ## skip authentication is login or signup route is pinged
    if request.endpoint in public_views:
        import ipdb;ipdb.set_trace()
        return
    
    ## validate signed secret to check validity & presence of JWT in headers
    if not verify_jwt_in_request():
        return make_response({"error": "Authentication failed - Please Log Back In"} ,401)
    
    ## grab the user id from the jwt
    user_id = get_jwt_identity()

    ## use a database lookup to create a current user variable
    currentUser = User.query.filter(User.id == user_id).one()

    ## assign the user variable to the request context so that it can be used in the following route
    g.current_user = currentUser
    
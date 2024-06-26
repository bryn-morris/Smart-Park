from models.user import User
from config import redis_client
from flask import make_response, request, g
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from helpers.auth_error import AuthError

def authenticate_user():

    public_views = [
        'login',
        'signup',
    ]
    
    ## skip JWT_authentication if login or signup route is pinged
    if request.endpoint in public_views:
        return
    
    ## validate signed secret to check validity & presence of JWT in headers
    if not verify_jwt_in_request():
        return make_response({"error": "Authentication failed - Please Log Back In"} ,401)
    
    ## grab the user id from the jwt
    try:
        user_id = get_jwt_identity()
        
        currentUser = User.query.filter(User.id == user_id).one()

        ## assign the user variable to the request context so that it can be used in the following route
        g.current_user = currentUser
    except:
        return make_response({"error": "Authentication failed - Please Contact Admin, Error Code: #0000001"} ,401)
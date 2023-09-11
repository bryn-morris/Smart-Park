from models import User
from flask import session, make_response

def Admin_Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        sel_user = User.query.filter(session['user_id']==User.id).one()
        if sel_user.admin==False:
            return make_response({"error": "Authentication failed - User is not admin"},401)
        return func(*args, **kwargs)

    return wrapper_func

def Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):

        try:
            sel_user = User.query.filter(session['user_id']==User.id).one()
        except:
            return make_response({"error":"User is not logged in!"}, 401)

        return func(*args, **kwargs)

    return wrapper_func
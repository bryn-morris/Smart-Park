from config import jwt

from models.user import User

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    ## Short for subject claim -> loading filtered user object into JWT
    identity = jwt_data["sub"]
    return User.query.filter(id == identity.id).one_or_none()

# Standard library imports

import os
import datetime

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager


# Local imports
# from auth_middleware import authenticate_user
from auth_middleware import authenticate_user

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

#Middleware Function
app.before_request(authenticate_user)

#export this to non-prod config variable file down the line
development_secret = "ex13^xe80xc8@x8x&x1b*x9d$rx8IZxcxeft"

# Grabs secret key from the environment variable, otherwise grab development secret
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', development_secret)

## JWT Config Tools
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=20)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(minutes=20)
app.config['JWT_ALGORITHM'] = "HS256"


# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# will need to change cors allowed origins for dvpmnt
socketio = SocketIO(
    app, 
    cors_allowed_origins = '*',
    manage_session = True,
    cors_credentials = True,
)

#Bcrypt Setup
bcrypt = Bcrypt(app)

#JWT-Extended Instantiation
jwt = JWTManager(app)

# Instantiate REST API
api = Api(app)

# Need to serve backend over https for this to work
# # Allow for cross-site session cookie
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'

# Instantiate CORS
CORS(app, supports_credentials=True, origins="http://localhost:4000", methods=['POST', 'GET', 'OPTIONS'])



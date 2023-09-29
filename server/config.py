# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from flask_socketio import SocketIO

# Local imports



# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = "ex13^xe80xc8@x8x&x1b*x9d$rx8IZxcxeft"

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

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Need to serve backend over https for this to work
# # Allow for cross-site session cookie
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'

# Instantiate CORS
CORS(app, supports_credentials=True, origins="http://localhost:4000", methods=['POST', 'GET', 'OPTIONS'])

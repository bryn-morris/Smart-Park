#!/usr/bin/env python3

# Local imports
from config import app, socketio

from websocket.friends_namespace import FriendNamespace

from auth_middleware import authenticate_user

from blueprints.review import review_routes
from blueprints.auth import auth_views
from blueprints.dog_parks import dog_park_routes
from blueprints.dogs import dog_routes
from blueprints.friendships import friendship_routes
from blueprints.users import user_routes
from blueprints.visits import visit_routes
from blueprints.http_tests import http_test_routes

# Registering Namespaces
socketio.on_namespace(FriendNamespace('/friends-socket'))

#Middleware Function
app.before_request(authenticate_user)

# Registering Routing for Blueprints
app.register_blueprint(review_routes)
app.register_blueprint(auth_views)
app.register_blueprint(dog_park_routes)
app.register_blueprint(dog_routes)
app.register_blueprint(friendship_routes)
app.register_blueprint(user_routes)
app.register_blueprint(visit_routes)
app.register_blueprint(http_test_routes)


if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)
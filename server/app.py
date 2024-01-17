#!/usr/bin/env python3

# Local imports
from config import app, socketio

from websocket.friends_namespace import FriendNamespace

from blueprints.review import review_routes
from blueprints.auth import auth_views
from blueprints.dog_parks import dog_park_routes
from blueprints.dogs import dog_routes
from blueprints.friendships import friendship_routes
from blueprints.users import user_routes
from blueprints.visits import visit_routes


# Registering Namespaces
socketio.on_namespace(FriendNamespace('/friends-socket'))

# Registering Routing for Blueprints
app.register_blueprint(review_routes)
app.register_blueprint(auth_views)
app.register_blueprint(dog_park_routes)
app.register_blueprint(dog_routes)
app.register_blueprint(friendship_routes)
app.register_blueprint(user_routes)
app.register_blueprint(visit_routes)

if __name__ == '__main__':
    # print(app.before_request_funcs)
    socketio.run(app, port=5555, debug=True)
#!/usr/bin/env python3

# Local imports
from config import app, socketio
from blueprints.review import review_routes
from blueprints.auth import auth_views
from blueprints.dog_parks import dog_park_routes
from blueprints.dogs import dog_routes
from blueprints.friendships import friendship_routes
from blueprints.users import user_routes

# Registering Routing for Blueprints
app.register_blueprint(review_routes)
app.register_blueprint(auth_views)
app.register_blueprint(dog_park_routes)
app.register_blueprint(dog_routes)
app.register_blueprint(friendship_routes)
app.register_blueprint(user_routes)

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)
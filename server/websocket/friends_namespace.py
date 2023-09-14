from flask_socketio import Namespace

class FriendNamespace(Namespace):
    def on_connect(self):
        # websocket connection logic
        pass

    def on_disconnect(self):
        #websocket disconnect logic
        pass

    def on_friend_request(self):
        # websocket friend request logic, will likely
        # need to add more arguments here
        pass
from flask_socketio import Namespace

class FriendNamespace(Namespace):
    def on_connect(self):
        print('Client Connected to FriendNamespace')
        self.emit('connection_confirm', {'message': 'Sucessfully Connected to Friend NameSpace Websocket'})

    def on_disconnect(self):
        #websocket disconnect logic
        pass

    def on_friend_request(self):
        # websocket friend request logic, will likely
        # need to add more arguments here
        pass
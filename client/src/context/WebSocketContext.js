import { createContext, useState, useEffect, useContext} from "react";

import { AuthContext } from "./AuthContext";
import { DogParkContext } from "./DogParkContext"
import { FriendsContext } from "./FriendsContext"
import { useHistory } from "react-router-dom"

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    const [friendSocket, setFriendSocket] = useState(null)

    const {setCurrentUser} = useContext(AuthContext)
    const {setDogParks} = useContext(DogParkContext)
    const {setFriendsList, setPendingFriendsList} = useContext(FriendsContext)
    const history = useHistory()

    const friend_request_response_map = {
        "request_response" : (data)=>setPendingFriendsList(()=>data.pend_friend_state),
        "accept_response" : ()=>{},
        "delete_response" : ()=>{},
    }

    useEffect(()=>{

        if (friendSocket) {

            // Websocket Event Handlers below
            friendSocket.on('connection_status', (data)=>{
                console.log(data.message)
            })

            friendSocket.on('server_error_response', (data)=>{
                console.error(data.message)
            })

            friendSocket.on('friend_request_response', (data)=>{
                let handler_function = friend_request_response_map[data.config_key];
                
                if (handler_function) {
                    handler_function(data)
                }
                else {
                    console.log("Error! No handler found")
                };

            })

            friendSocket.on('friend_socket_disconnect', ()=>{
                fetch('/logout', {method:"DELETE",})
                setCurrentUser(null)
                setDogParks([])
                setFriendsList([])
                friendSocket.disconnect()
                history.push("/")
                setFriendSocket(null)
            })
        }
    }, [
        friendSocket, 
        history, 
        setCurrentUser, 
        setDogParks, 
        setFriendsList, 
        setPendingFriendsList,
    ])
    
    // Current User Accepts Friend Request
    // include some sort of logic so that if a user accepts
    // a pending request then change 'request_status' key from false
    // to true, otherwise default to false, maybe pass in as an argument
    // that is true and overwrite key value to argument
    // value but only provide this value if pending request is accepted?
    // once user is added on the backend through a post, make sure to update friendslist state

    // Current User Sends Friend Request
    // create logic so that currentUser state is updated
    // with the pending friendship changes and a notification is given
    // to the current user that a request has been sent
    // also update pending friend frequest state

    function sendFriendRequest(friend_id) {
        friendSocket.emit('friend_request', {friend_id: friend_id})
        // This sender value then determines how the corresponding frontends can
        // Interact with the request. (If user A sends message -> sender = True, they cannot accept, 
        // but user B -> sender = False can accept)
    }

    function acceptFriendRequest(friend_id) {
        console.log("is this hooked up?")
    }

    function deleteFriend(friend_id) {
        friendSocket.emit('delete_request', {friend_id: friend_id})
        // console.log("delete friends action")
    }

    // Once the add friend buttons are rendered for each 
    // element in friends list state
    // do not render addFriend button for targeted user 
    // if the targeted user is already friends with the current user

    // Will need to implement reconnection logic tied to a timer if connection is lost for whatever reason
    // also will need add modularity to websocket url in config file with production and non-production variables

    return (
        <WebSocketContext.Provider 
            value ={{
                        friendSocket,
                        setFriendSocket,
                        sendFriendRequest,
                        deleteFriend,
                        acceptFriendRequest,
                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketContext, WebSocketProvider}
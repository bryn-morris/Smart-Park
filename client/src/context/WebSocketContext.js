import { createContext, useState, useEffect, useContext} from "react";

import { AuthContext } from "./AuthContext";
import { DogParkContext } from "./DogParkContext"
import { FriendsContext } from "./FriendsContext"
import { useHistory } from "react-router-dom"
import { clearLocalStorageKey } from "../utils/localStorage_util";
// import { stripJWT } from "../utils/stripJWT_util";

import fetchData from "../utils/fetch_util"; 

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    const [friendSocket, setFriendSocket] = useState(null)

    const {
        setCurrentUser, 
        setIsReLogOpen, 
        setIsLogOutModalRendered,
        authConfigObj,
    } = useContext(AuthContext)
    const {
        setDogParks,
        setRecentParks,
    } = useContext(DogParkContext)
    const {
        setFriendsList, 
        setPendingFriendsList
    } = useContext(FriendsContext)
    const history = useHistory()

    useEffect(()=>{

        const friend_request_response_map = {
            "request_response" : (data)=>setPendingFriendsList(()=>data.pend_friend_state),
            "accept_response" : ()=>{},
            "friend_delete_response" : (data)=>setFriendsList(()=>data.friend_state),
            "pend_delete_response" : ()=>{}
        }

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

            friendSocket.on('friend_socket_disconnect', async ()=>{

                fetchData('/logout', setIsReLogOpen, {...authConfigObj, method:"DELETE",})
                    .then(response => clearLocalStorageKey('aKey'))
                
                // const strippedToken = stripJWT(response.headers.get('Authorization'));
                // addOrUpdateLocalStorageKey('aKey', strippedToken)
                
                setCurrentUser(null)
                setDogParks([])
                setFriendsList([])
                setRecentParks([])
                setIsLogOutModalRendered(false)
                setFriendSocket(null)
                friendSocket.disconnect()
                history.push("/")
            })
        }
    }, [
        friendSocket, 
        history, 
        setCurrentUser, 
        setDogParks, 
        setFriendsList, 
        setPendingFriendsList,
        setIsReLogOpen,
        setIsLogOutModalRendered,
        setRecentParks,
        authConfigObj,
    ])

    function sendFriendRequest(friend_id) {
        friendSocket.emit('friend_request', {
            friend_id: friend_id
        })
        // This sender value then determines how the corresponding frontends can
        // Interact with the request. (If user A sends message -> sender = True, they cannot accept, 
        // but user B -> sender = False can accept)
    }

    function acceptFriendRequest(friend_id, friendship_id, isPendingBoolean) {
        console.log("Is this working?")
        friendSocket.emit('accept_friend_request', {
            friend_id: friend_id, 
            friendship_id: friendship_id, 
            is_pending_boolean: isPendingBoolean
        })
    }

    function deleteFriend(friend_id, friendship_id) {
        friendSocket.emit('delete_request', {
            friend_id: friend_id, 
            friendship_id: friendship_id, 
        })
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
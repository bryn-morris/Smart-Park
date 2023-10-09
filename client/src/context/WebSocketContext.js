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
                // if we have a valid response, update the pending friend request state, which then determines
                // if add friend button is rendered or if other info is rendered in search
                console.log(data.pend_friend_state)
                setPendingFriendsList(()=>data.pend_friend_state)
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
        setPendingFriendsList
    ])

    // Create a Catch to handle error responses!
    // also logic to handle different responses from
    // The friendship decorator on the backend
    
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
    }

    function deleteFriend(friendship_id) {
        // fetch(`/friends/${friendship_id}`, {
        //     method: "DELETE",
        // })

        // search both pending friends and friends table and delete entries
        console.log("delete friends action")
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
                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketContext, WebSocketProvider}
import {Icon} from "semantic-ui-react"
import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"

function FriendSearchIcon ({title, image, friend_id}) {

    const {sendFriendRequest} = useContext(WebSocketContext)

    // Change Icon based on:
    //     1. User a is not friends or pending friends with user b
    //     1. User a has sent friend request already
    //     2. User a has option to accept friend request
    //     3. User a is already friends with this user b
    //

    function searchIconConstructor() {

    }

    return(
        <div>
            <Icon
                name = "user plus"
                className="searchResult icon"
                title="Click to send friend request"
                onClick = {()=>sendFriendRequest(friend_id)}
            />
        </div>
    )
}

export default FriendSearchIcon
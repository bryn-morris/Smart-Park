import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { Icon } from "semantic-ui-react"

function FriendCard ({eachFr}) {

    const { deleteFriend} = useContext(WebSocketContext)

    return(
        <div className="FriendCard">
            <p>{eachFr.friend_data.username}</p>
            <Icon
                name = "user cancel"
                onClick={()=>{deleteFriend(eachFr.friend_data.id, eachFr.request_metadata.friendship_id)}}
                title = "Remove friend"
            >
                Delete Friend
            </Icon>
        </div>
    )
}

export default FriendCard
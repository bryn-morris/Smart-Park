import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { Icon } from "semantic-ui-react"

function FriendCard ({eachFr}) {

    const { deleteFriend} = useContext(WebSocketContext)

    return(
        <div className="FriendCard">
            <p>{eachFr.username}</p>
            <Icon
                name = "user cancel"
                onClick={()=>{deleteFriend(5)}}
                title = "Remove friend"
            >
                Delete Friend
            </Icon>
        </div>
    )

}

export default FriendCard
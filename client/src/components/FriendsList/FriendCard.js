import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { Button } from "semantic-ui-react"

function FriendCard ({eachFr}) {

    const {sendFriendRequest, deleteFriend} = useContext(WebSocketContext)

    return(
        <div>
            <Button
                onClick={()=>{sendFriendRequest(4)}}
            >
                Add Friend
            </Button>
            <Button
                onClick={()=>{deleteFriend(5)}}
            >
                Delete Friend
            </Button>
        </div>
    )

}

export default FriendCard
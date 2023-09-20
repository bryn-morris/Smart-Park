import { Button } from "semantic-ui-react"
import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"


function FriendListElement() {

    const {sendFriendRequest, deleteFriend,} = useContext(WebSocketContext)

    return (
        <div className="FriendListElement">
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

export default FriendListElement
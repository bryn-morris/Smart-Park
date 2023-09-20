import { useContext } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { Button } from "semantic-ui-react"

function FriendCard ({eachFr}) {

    const { deleteFriend} = useContext(WebSocketContext)

    console.log(eachFr)

    return(
        <div className="FriendCard">
            <p>{eachFr.username}</p>

            <Button
                onClick={()=>{deleteFriend(5)}}
            >
                Delete Friend
            </Button>
        </div>
    )

}

export default FriendCard
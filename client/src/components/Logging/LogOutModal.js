import { Button, Modal } from "semantic-ui-react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { DogParkContext } from "../../context/DogParkContext"
import { useHistory } from "react-router-dom"
import { FriendsContext } from "../../context/FriendsContext"
import { WebSocketContext } from "../../context/WebSocketContext"

function LogOutModal ({isLogOutModalRendered, setIsLogOutModalRendered}) {

    const {setCurrentUser} = useContext(AuthContext)
    const {setDogParks} = useContext(DogParkContext)
    const {setFriendsList} = useContext(FriendsContext)
    const { friendSocket, setFriendSocket} = useContext(WebSocketContext)
    const history = useHistory()

    function logOut() {
        fetch('/logout', {method:"DELETE",})
        setCurrentUser(null)
        setDogParks([])
        setFriendsList([])
        friendSocket.disconnect()
        setFriendSocket(null)
        // clear state and close websocket
        history.push("/")
        
    }

    return(
    <div>
        <Modal
            onClose={() => setIsLogOutModalRendered(false)}
            onOpen={() => setIsLogOutModalRendered(true)}
            open={isLogOutModalRendered}
            size= 'large'
        >
            <Modal.Header>
                Log Out
            </Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to log out?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={logOut}
                >
                    Yes, Log Me Out
                </Button>
                <Button
                    onClick={()=>{setIsLogOutModalRendered(false)}}
                >
                    Close
                </Button>
            </Modal.Actions>

        </Modal>
    </div>
    )
}

export default LogOutModal 
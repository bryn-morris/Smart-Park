import { Button, Modal } from "semantic-ui-react"
import { useContext } from "react"

import { WebSocketContext } from "../../context/WebSocketContext"
import { AuthContext } from "../../context/AuthContext"
function LogOutModal () {

    const { friendSocket } = useContext(WebSocketContext)
    const { isLogOutModalRendered,
        setIsLogOutModalRendered } = useContext(AuthContext)

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
                {/* change this from button when logout starts */}
                <Button
                    onClick={()=>friendSocket.emit('start_disconnect')}
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
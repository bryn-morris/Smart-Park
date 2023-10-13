import { Button, Modal } from "semantic-ui-react";
import { AuthContext } from "../../context/AuthContext";
import { WebSocketContext } from "../../context/WebSocketContext";
import { useContext } from "react";


function ReLogModal () {

    const {isReLogOpen, setIsReLogOpen} = useContext(AuthContext)
    const {friendSocket} = useContext(WebSocketContext)

    function handleReLog () {
        setIsReLogOpen(false)
        friendSocket.emit('start_disconnect')
    }

    return(
        <Modal
            size = "small"
            open = {isReLogOpen}
            dimmer = "blurring"
        >
            <Modal.Header>
                <p>It looks like you're Signed out!</p>
            </Modal.Header>
            <Modal.Content>
                <p>Please Hit LogOut Below to Re-Log</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={handleReLog}
                >
                    LogOut
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ReLogModal
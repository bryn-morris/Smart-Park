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
                <p>It looks like you're not Signed in!</p>
            </Modal.Header>
            <Modal.Content>
                <p>Please Log Back in with the button below!</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={handleReLog}
                >
                    Log me back in!
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ReLogModal
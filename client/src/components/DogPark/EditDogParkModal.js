import { Button, Modal} from 'semantic-ui-react'
import EditDogParkForm from './EditDogParkForm'

function EditDogParkModal({eachDogPark, isEditModalOpen, setIsEditModalOpen}){

    const handleEditModalClose = () => {
        setIsEditModalOpen(false)
    }

    return(
        <div>
            <Modal
                onClose={() => handleEditModalClose()}
                open={isEditModalOpen}
                size= 'large' 
            >
                <Modal.Header></Modal.Header>
                <Modal.Content>
                    <EditDogParkForm
                        eachDogPark = {eachDogPark}
                        setIsEditModalOpen = {setIsEditModalOpen}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        form = 'editDogParkForm'
                        type='submit'
                    >Submit
                    </Button>
                    <Button
                        onClick = {()=>setIsEditModalOpen(false)}
                    >Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default EditDogParkModal
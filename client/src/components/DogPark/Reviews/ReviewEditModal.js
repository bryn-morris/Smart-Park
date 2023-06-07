import { Button, Modal, Form, Input } from 'semantic-ui-react'

function ReviewEditModal ({
    isEditModalOpen, 
    setIsEditModalOpen, 
    editModalFormObject,
    handleSubmitEdit,
    setEditModalFormObject,
}) 

{

    const handleEditFormInputChange = (e) => {
        setEditModalFormObject(
            ()=>{return{...editModalFormObject, [e.target.name]: e.target.value}}
        )
    }

    return(
        <Modal
                onClose={() => setIsEditModalOpen(false)}
                open={isEditModalOpen}
                size= 'small'
              >
                <Modal.Header>Editing your Review!</Modal.Header>

                <Modal.Content>
                    <Form id = "reviewForm" onSubmit={handleSubmitEdit}>
                        <br/>
                        <label>Comment:</label>
                        <Input 
                            type="text" 
                            name = "comment" 
                            value={editModalFormObject.comment} 
                            onChange={handleEditFormInputChange} 
                            placeholder = 'comment'
                        />
                        <br/>
                        <label>Rating:</label>
                        <Input 
                            type="number" 
                            name = "rating" 
                            value={editModalFormObject.rating} 
                            onChange={handleEditFormInputChange} 
                            placeholder = "rating 1-5"
                            min = '1'
                            max = '5'
                        />
                        <br/>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button 
                      content = 'Submit Changes'
                      onClick = {handleSubmitEdit}
                    />
                    <Button 
                      content = 'Cancel'
                      onClick = {() => setIsEditModalOpen(false)}
                    />
                </Modal.Actions>

              </Modal>
    )
}

export default ReviewEditModal
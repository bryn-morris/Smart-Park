import { useContext } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { AuthContext } from '../../../context/AuthContext';
import { DogParkContext } from '../../../context/DogParkContext';
import fetchData from '../../../utils/fetch_util';

function ReviewEditModal ({
    isEditModalOpen, 
    setIsEditModalOpen, 
    editModalFormObject,
    setEditModalFormObject,
    eachDogPark
}) {

    const {dogParks, setDogParks} = useContext(DogParkContext)
    const {currentUser, setIsReLogOpen, authConfigObj} = useContext(AuthContext)

    function handleSubmitEdit () {
        setIsEditModalOpen(false)
  
        editModalFormObject.user_id = parseInt(currentUser.id);
        
      const editRevDogParkConfigObj = {
        ...authConfigObj,
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editModalFormObject)
      }


        fetchData(`/review_dog_park/${eachDogPark.id}`,
          setIsReLogOpen, 
          editRevDogParkConfigObj
        )
        .then(resp_obj => {
                  setDogParks(
                    dogParks.map(eachDP=>{
                      if (eachDP.id === resp_obj.updated_dog_park.id){
                        return resp_obj.updated_dog_park
                      } 
                      return eachDP
                    })
                  )
                })
      }

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
import { Button, Modal, Popup } from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState, useContext, useEffect} from 'react';
import Reviews from './Reviews'
import ReviewEditModal from './ReviewEditModal'
import {AuthContext} from '../../../context/AuthContext'
import { DogParkContext } from '../../../context/DogParkContext';


function ReviewModal ({eachDogPark}) {

    const [modalContent, setModalContent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editModalFormObject, setEditModalFormObject] = useState({})
    const [addReviewDisabled, setAddReviewDisabled] = useState(false) 

    const {currentUser} = useContext(AuthContext)
    const {setDogParks, dogParks} = useContext(DogParkContext)
    
    useEffect(()=>{
      if (eachDogPark.reviews.filter(each=>each.user.username === currentUser.username).length !== 0) {
        setAddReviewDisabled(true)
      }
    },[currentUser.username, eachDogPark.reviews])


    function handleSubmitEdit () {
      setIsEditModalOpen(false)

      editModalFormObject.user_id = parseInt(currentUser.id);
      
      fetch(`/review_dog_park/${eachDogPark.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editModalFormObject)
      })
        .then( r=>{
          if (r.ok){
            r.json().then(resp_obj => {
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
          else {
            r.json().then(resp => alert(resp.message))
          }
        })
    }

    const handleModalClose = (e) => {
      setModalContent(false)
      setIsModalOpen(false)
    }

    const reviewComponents = () => {
      if (eachDogPark.reviews.length === 0) {
        return null
      } else {
        return (
          eachDogPark.reviews.map(review => <Reviews 
            key={review.id}
            eachDogPark = {eachDogPark} 
            review = {review}
            setIsEditModalOpen = {setIsEditModalOpen}
            setEditModalFormObject= {setEditModalFormObject}
            setAddReviewDisabled = {setAddReviewDisabled}
          />)
          )}
    }

    const EditModalPropsObject = {
      isEditModalOpen: isEditModalOpen,
      setIsEditModalOpen: setIsEditModalOpen,
      editModalFormObject: editModalFormObject,
      handleSubmitEdit: handleSubmitEdit,
      setEditModalFormObject: setEditModalFormObject,
    }

    const tooltipText = 'Only one review per park! Please either edit or delete your current'

    return (
        <div>
            <Modal
                onClose={() => handleModalClose()}
                onOpen={() => setIsModalOpen(true)}
                open={isModalOpen}
                trigger={<Button className = "big ui black button modalbutton">Reviews</Button>}
                size= 'large'
            >
            <Modal.Header>{modalContent ? 'Review Form' : 'Reviews' }</Modal.Header>

              <Modal.Content>
                  {modalContent ?
                    <ReviewForm
                      dogParkID = {eachDogPark.id}
                      setModalContent = {setModalContent}
                      setAddReviewDisabled = {setAddReviewDisabled}
                    /> 
                    :
                    reviewComponents()
                  }
              </Modal.Content>
  
              <Modal.Actions>
                {/* add tooltip to button showing user can only have one review, and need to edit or delete */}
                  <Popup
                    content = {tooltipText}
                    trigger = {
                      // fix blinking behavior when cursor is between text and edge of button
                      <span>
                        <Button
                          onClick={()=>{setModalContent(!modalContent)}}
                          disabled = {addReviewDisabled && modalContent === false}
                        >
                          {modalContent ? 'Read Reviews' : 'Add Review' }
                        </Button>
                      </span>  
                    }
                    disabled = {!addReviewDisabled}
                    position='top center'
                  />
                  
                  
                  {modalContent ?
                  <Button
                    form = "reviewForm"
                    type = "submit"
                    disabled = {addReviewDisabled}
                  >Submit
                  </Button> :
                  null }
              </Modal.Actions>

              <ReviewEditModal
                {...EditModalPropsObject}
              />
                  
            </Modal>
        </div>
    )
}

export default ReviewModal
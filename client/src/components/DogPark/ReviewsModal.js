import { Button, Modal } from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState, useContext} from 'react';
import Reviews from './Reviews'
import ReviewEditModal from './ReviewEditModal'
import {AuthContext} from '../../context/AuthContext'
import { DogParkContext } from '../../context/DogParkContext';

function ReviewModal ({eachDogPark}) {

    const [modalContent, setModalContent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [reviews, setReviews] = useState(eachDogPark.reviews)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editModalFormObject, setEditModalFormObject] = useState({}) 


    const {currentUser} = useContext(AuthContext)
    const {setDogParks, dogParks} = useContext(DogParkContext)
  
    function handleAddReview (formObject) {

      formObject.user_id = parseInt(currentUser.id);

      fetch(`/review_dog_park/${eachDogPark.id}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formObject)
      })
      .then(r=> r.ok? 
        r.json().then(resp_obj => {
          setReviews([...reviews, resp_obj.new_review])
          setDogParks(
            dogParks.map((eachDP)=>{
              if (eachDP.id === resp_obj.updated_dog_park.id){
                return resp_obj.updated_dog_park
              } 
              return eachDP
            })
          )
        }):
        r.json().then(r => alert(r.message))
      )
    }

    function handleDeleteReview (review_id) {

      fetch(`/review_dog_park/${eachDogPark.id}`, {
        method : 'DELETE',
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify({id: review_id}) 
      })
        .then(r=> r.ok?
              r.json().then(delete_obj => {
                setReviews(reviews => {
                  return reviews.filter(eachReview => eachReview.id !== review_id)
                })
                setDogParks(()=>{
                  return dogParks.map((eDP)=>{
                    if (eDP.id === eachDogPark.id){
                      if (delete_obj.new_dp_avg_rating){
                        eDP.rating = delete_obj.new_dp_avg_rating
                      } else {
                        eDP.rating = null
                      }                      
                    } 
                    return eDP
                  })
                })
              })
            :
              r.json().then(resp => alert(resp.message))
          )
    }

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
                if (resp_obj.updated_dog_park){
                  setDogParks(
                    dogParks.map(eachDP=>{
                      if (eachDP.id === resp_obj.updated_dog_park.id){
                        return resp_obj.updated_dog_park
                      } 
                      return eachDP
                    })
                  )
                }
                setReviews(
                  reviews.map(eachRev => {
                    if (eachRev.id === resp_obj.updated_review.id){
                      return resp_obj.updated_review
                    }
                    return eachRev
                  })
                )
              })
            } else {
              r.json().then(resp => alert(resp.message))
            }
          } 
          )
    }

    const handleModalClose = (e) => {
      setModalContent(false)
      setIsModalOpen(false)
    }

    const reviewComponents = () => {
      if (reviews.length === 0) {
        return null
      } else {
        return (
          reviews.map(review => <Reviews 
            key={review.id} 
            review = {review}
            handleDeleteReview = {handleDeleteReview}
            setIsEditModalOpen = {setIsEditModalOpen}
            setEditModalFormObject= {setEditModalFormObject}
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
                    <ReviewForm handleAddReview = {handleAddReview} setIsModalOpen={setIsModalOpen}/> :
                    reviewComponents()
                  }
              </Modal.Content>
  
              <Modal.Actions>
                  <Button
                    onClick={()=>{setModalContent(!modalContent)}}
                  >
                    {modalContent ? 'Read Reviews' : 'Add Review' }
                  </Button>
                  {modalContent ?
                  <Button
                    form = "reviewForm"
                    type = "submit"
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
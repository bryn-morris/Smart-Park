import { Button, Modal} from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState, useContext} from 'react';
import Reviews from './Reviews'
import {AuthContext} from '../../context/AuthContext'
import { DogParkContext } from '../../context/DogParkContext';

function ReviewModal ({eachDogPark}) {

    // buttons are addreview, show review, modal 

    const [modalContent, setModalContent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [reviews, setReviews] = useState(eachDogPark.reviews)

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

      fetch(`/reviews/${review_id}`, {
        method : 'DELETE',
      })
        .then(r=>{
          if (r.ok){
            setReviews(reviews => {
              return reviews.filter(eachReview => eachReview.id !== review_id)
            })
          } else {
            r.json().then(resp => alert(resp.message))
          }
        }
        )
    }

    function handleEditReview (review_id) {

      

    }

    const handleModalClose = () => {
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
            handleEditReview = {handleEditReview}
          />)
          )}
      }

    return (
        <div>
            <Modal
                onClose={() => handleModalClose()}
                onOpen={() => setIsModalOpen(true)}
                open={isModalOpen}
                trigger={<Button className = "big ui black button modalbutton">Reviews</Button>}
                size= 'small'
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
                  
            </Modal>
        </div>
    )
}

export default ReviewModal
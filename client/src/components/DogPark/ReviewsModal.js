import { Button, Modal} from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState, useContext} from 'react';
import Reviews from './Reviews'
import {AuthContext} from '../../context/AuthContext'

function ReviewModal ({id, finddpbi, reviews}) {

    // buttons are addreview, show review, modal 

    const [modalContent, setModalContent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {currentUser} = useContext(AuthContext)

    function handleAddReview (formObject) {

      formObject.dog_park_id = id;
      formObject.user_id = currentUser.id

      fetch("/reviews", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
      })
      .then(r=> r.ok? 
        r.json().then(review => finddpbi(review)):
        r.json().then(r => alert(r.message))
      )
    }

    const handleClick = () => {

      setModalContent(!modalContent)
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
          reviews.map(review => <Reviews key={review.id} review = {review}/>)
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
                            onClick={handleClick}
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
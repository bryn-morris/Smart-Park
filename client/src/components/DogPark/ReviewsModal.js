import { Button, Modal} from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState} from 'react';
import Reviews from './Reviews'

function ReviewModal ({id, finddpbi, reviews}) {

    // buttons are addreview, show review, modal 

    const [modalContent, setModalContent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleAddReview (formObject) {

      formObject.dog_park_id = id;

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
          
          reviews.map(
            
              review => <Reviews key={review.id} {...review}/>

            )
          )}
      }

    return (
        <div>
            <Modal
                    onClose={() => handleModalClose()}
                    onOpen={() => setIsModalOpen(true)}
                    open={isModalOpen}
                    trigger={<Button className = "big ui button modalbutton">Reviews</Button>}
                    size= 'small'
                >
                <Modal.Header>{modalContent ? 'Review Form' : 'Reviews' }</Modal.Header>
      
                      <Modal.Content>
                          {modalContent ?
                            <ReviewForm handleAddReview = {handleAddReview}/> :
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
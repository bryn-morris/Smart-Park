import { Button, Modal } from 'semantic-ui-react'
import ReviewForm from './ReviewForm';
import {useState, useContext} from 'react';
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

    // need to tie reviewed parks id to user attribute, and then when
    // dog parks loads, grey out the add review button based on whether
    // or not that dog park cards id is in that attribute list
    
    // useEffect(()=>{
    //   fetch(`/review_dog_park/${eachDogPark.id}`)
    //     .then(r => {
    //       if (r.status === 409) {
    //         setAddReviewDisabled(true)
    //       }
    //     })
    // },[eachDogPark, setAddReviewDisabled])

  // if (eachDogPark.reviews.filter(each=>each.user.username === currentUser.username).length === 0) {
  //   console.log('testing')
  //   setAddReviewDisabled(true)
  // }


    function handleDeleteReview (review_id) {

      fetch(`/review_dog_park/${eachDogPark.id}`, {
        method : 'DELETE',
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify({id: review_id}) 
      })
        .then(r=> r.ok?
              r.json().then(delete_obj => {
                setAddReviewDisabled(false)
                setDogParks(()=>{
                  return dogParks.map((eDP)=>{
                    if (eDP.id === eachDogPark.id){
                      // remove review from selected dog park
                        eDP.reviews = eachDogPark.reviews.filter((eachReview)=>{
                          return eachReview.id !== review_id
                        })
                      // update rating of dog park
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
                    <ReviewForm
                      dogParkID = {eachDogPark.id}
                      setAddReviewDisabled = {setAddReviewDisabled}
                    /> 
                    :
                    reviewComponents()
                  }
              </Modal.Content>
  
              <Modal.Actions>
                {/* add tooltip to button showing user can only have one review, and need to edit or delete */}
                  <Button
                    onClick={()=>{setModalContent(!modalContent)}}
                    disabled = {addReviewDisabled && modalContent === false}
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
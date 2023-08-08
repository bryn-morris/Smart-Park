import { Button } from 'semantic-ui-react'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import ReviewDeleteButton from './ReviewDeleteButton.js'

function Reviews({
  review,
  setIsEditModalOpen,
  setEditModalFormObject,
  eachDogPark,
  setAddReviewDisabled,
}) {

  const { currentUser } = useContext(AuthContext)

  function passUpEditData () {

    setEditModalFormObject({
      comment: review.comment,
      rating: review.rating,
      id: review.id,
    })

    setIsEditModalOpen(true)
  }

    return (
    <div>
        <h1>------------------------------------------------------------------</h1>
        <div>
          {review.user.username === currentUser.username ?
            <div>
              <ReviewDeleteButton 
                eachDogPark = {eachDogPark}
                review = {review}
                setAddReviewDisabled = {setAddReviewDisabled}
              />
              <Button onClick = {passUpEditData}>
                Edit(AddIconLater)
              </Button>
            </div>
            :
            null
          }
        </div>
        <br/>
        <h2>{review.user.username}</h2>
        <h3>{review.comment}</h3>
        <h1>⭐ {review.rating} Stars ⭐</h1>
        <h1>------------------------------------------------------------------</h1>
    </div>
    )
  }
  
export default Reviews
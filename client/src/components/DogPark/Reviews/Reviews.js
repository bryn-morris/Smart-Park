import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import ReviewDeleteButton from './ReviewDeleteButton.js'
import ReviewEditButton from './ReviewEditButton'

function Reviews({
  review,
  setIsEditModalOpen,
  setEditModalFormObject,
  eachDogPark,
  setAddReviewDisabled,
}) {

  const { currentUser } = useContext(AuthContext)

  const editButtonPropsObj = {
    setEditModalFormObject: setEditModalFormObject,
    review: review,
    setIsEditModalOpen: setIsEditModalOpen,
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
              <ReviewEditButton 
                {...editButtonPropsObj}
              />
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
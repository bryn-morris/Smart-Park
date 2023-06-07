import { Button } from 'semantic-ui-react'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'

function Reviews({
  review, 
  handleDeleteReview,
  setIsEditModalOpen,
  setEditModalFormObject,
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
              <Button onClick = {() => {handleDeleteReview(review.id)}}>
                Delete(AddIconLater)
              </Button>
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
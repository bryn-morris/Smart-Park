import { Button } from "semantic-ui-react"

function ReviewEditButton ({setEditModalFormObject, review, setIsEditModalOpen}) {

    function passUpEditData () {

        setEditModalFormObject({
          comment: review.comment,
          rating: review.rating,
          id: review.id,
        })
    
        setIsEditModalOpen(true)
      }

    return (
        <Button onClick = {passUpEditData}>
            Edit(AddIconLater)
        </Button>
    )
}

export default ReviewEditButton
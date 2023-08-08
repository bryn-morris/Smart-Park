import { useContext } from "react"
import { Button } from "semantic-ui-react"
import { DogParkContext } from "../../../context/DogParkContext"

function ReviewDeleteButton ({eachDogPark, review, setAddReviewDisabled}) {

    const {dogParks, setDogParks} = useContext(DogParkContext)

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

    return (
        <Button onClick = {() => {handleDeleteReview(review.id)}}>
            Delete(AddIconLater)
        </Button>
    )
}

export default ReviewDeleteButton
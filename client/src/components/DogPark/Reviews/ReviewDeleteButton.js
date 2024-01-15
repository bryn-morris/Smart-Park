import { useContext } from "react"
import { Button } from "semantic-ui-react"
import { DogParkContext } from "../../../context/DogParkContext"
import { AuthContext } from "../../../context/AuthContext"
import fetchData from "../../../utils/fetch_util" 

function ReviewDeleteButton ({eachDogPark, review, setAddReviewDisabled}) {

    const {dogParks, setDogParks} = useContext(DogParkContext)
    const {setIsReLogOpen, authConfigObj} = useContext(AuthContext)

    function handleDeleteReview (review_id) {

      const delRevConfigObj = {
        ...authConfigObj,
        method : 'DELETE',
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify({id: review_id}) 
      }

      fetchData(`/review_dog_park/${eachDogPark.id}`,
        setIsReLogOpen,
        delRevConfigObj, 
        )
        .then(delete_obj => {
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
    }

    return (
        <Button onClick = {() => {handleDeleteReview(review.id)}}>
            Delete(AddIconLater)
        </Button>
    )
}

export default ReviewDeleteButton
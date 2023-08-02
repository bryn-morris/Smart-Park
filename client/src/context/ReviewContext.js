import { createContext, useState, useContext } from "react";
import {AuthContext} from './AuthContext'
import {DogParkContext} from './DogParkContext'

const ReviewContext = createContext()

function ReviewProvider({children}) {

    const {currentUser} = useContext(AuthContext)
    const {dogParks, setDogParks} = useContext(DogParkContext)

    const [isReviewFormRendered, setIsReviewFormRendered] = useState(false)
    const [isDPModalOpen, setIsDPModalOpen] = useState(false)

    function handleAddReview (formObject, dogParkID) {

        formObject.user_id = parseInt(currentUser.id);

        fetch(`/review_dog_park/${dogParkID}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formObject)
        })
        .then(r=> r.ok?
            // if response is okay, check to see if 
            // response from backend shows that user has
            // already submitted a review
            // if so, provide some manner of alert, 
            // otherwise, proceed as normal
            r.json().then(resp_obj => {
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

    return (
        <ReviewContext.Provider 
            value ={{
                        handleAddReview,
                        isReviewFormRendered,
                        setIsReviewFormRendered,
                        isDPModalOpen,
                        setIsDPModalOpen
                    }}
        >
            {children}
        </ReviewContext.Provider>
    )
}
export {ReviewContext, ReviewProvider}
import { createContext, useState, useContext } from "react";
import {AuthContext} from './AuthContext'
import {DogParkContext} from './DogParkContext'

const ReviewContext = createContext()

function ReviewProvider({children}) {

    const {currentUser} = useContext(AuthContext)
    const {dogParks, setDogParks} = useContext(DogParkContext)

    const [isReviewFormRendered, setIsReviewFormRendered] = useState(false)
    const [isDPModalOpen, setIsDPModalOpen] = useState(false)

    function handleAddReview (formObject, dogParkID, disableButtonFunc) {
        
        formObject.user_id = parseInt(currentUser.id);

        fetch(`/review_dog_park/${dogParkID}`, {
            method: 'POST',
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formObject)
        })
        .then(r => {
            // Shouldn't ever be tripped, but leaving in for functional redundancy
            if (r.status === 409) {
                disableButtonFunc(true)
            } else if (!r.ok) {
                return r.json().then(r => alert(r.message))
            } else {
                r.json().then(resp_obj => {
                    setDogParks(
                        dogParks.map((eachDP)=>{
                        if (eachDP.id === resp_obj.updated_dog_park.id){
                            return resp_obj.updated_dog_park
                        } 
                        return eachDP
                        })
                    )
                })
            }  
        })
        .catch(error => {
            console.error('Fetch error :', error)
        })
    }

    return (
        <ReviewContext.Provider 
            value ={{
                        handleAddReview,
                        isReviewFormRendered,
                        setIsReviewFormRendered,
                        isDPModalOpen,
                        setIsDPModalOpen,
                    }}
        >
            {children}
        </ReviewContext.Provider>
    )
}
export {ReviewContext, ReviewProvider}
import { createContext, useState, useContext } from "react";
import {AuthContext} from './AuthContext'
import {DogParkContext} from './DogParkContext'
import fetchData from "../utils/fetch_util";

const ReviewContext = createContext()

function ReviewProvider({children}) {

    const {currentUser, setIsReLogOpen} = useContext(AuthContext)
    const {dogParks, setDogParks} = useContext(DogParkContext)

    const [isReviewFormRendered, setIsReviewFormRendered] = useState(false)
    const [isDPModalOpen, setIsDPModalOpen] = useState(false)

    function handleAddReview (formObject, dogParkID, disableButtonFunc, modalContextFunc) {
        
        formObject.user_id = parseInt(currentUser.id);

        const addReviewConfigObj = {
            method: 'POST',
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formObject)
        }

        const httpStatusHandlers =  {
            409 : ()=>{
                disableButtonFunc(true)
                modalContextFunc(false)
            }
        }

        fetchData(
            `/review_dog_park/${dogParkID}`, 
            setIsReLogOpen, 
            addReviewConfigObj,
            httpStatusHandlers,
        )
            .then(resp_obj => {
                modalContextFunc(false)
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
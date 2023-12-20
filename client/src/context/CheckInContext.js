import { createContext, useState, useContext} from "react";
import { AuthContext } from "./AuthContext";
import { DogParkContext } from "./DogParkContext";
import fetchData from "../utils/fetch_util";

const CheckInContext = createContext()

function CheckInProvider({children}) {

    const { setIsReLogOpen} = useContext(AuthContext)
    const { recentParks, setRecentParks } = useContext(DogParkContext)

    const [accidentalCheckin, setAccidentalCheckin ] = useState(false)
    const [currentCheckInID, setCurrentCheckInID] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    ///////////// Check-In Functions ///////////////

    function checkOut () {

        const configObj = {
          method: 'PATCH',
          headers: {'Content-Type':'application/json'},
          body: {}
        }
    
        fetchData(`/visits/${parseInt(currentCheckInID)}`,setIsReLogOpen, configObj)
          .then(updatedVisit => {
            setCurrentCheckInID(null)
            sessionStorage.clear()
        })
    }

    console.log(recentParks)

    function handleCheckInFormSubmission(formObj){

        const getVisitConfigObj = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(formObj)
        }
    
        fetchData('/visits', setIsReLogOpen, getVisitConfigObj)
          .then(newVisit => {
            setCurrentCheckInID(newVisit.id)
            setAccidentalCheckin(true)
            sessionStorage.setItem('currentCheckInID', newVisit.id) 

            console.log(newVisit)

            setRecentParks(()=>{return(
              [...recentParks]
            )})
          // update recent parks with resaponse
          // If user accidentally checks in. It is a delete, otherwise is a patch
          // parks needs to be updated on response from backend, if deletion request
          // for checkin occurs on
          // backend, then parks needs to be removed from recent parks
        


        })
    }

    function deleteCheckIn(){

        fetchData(`/visits/${parseInt(currentCheckInID)}`, setIsReLogOpen, {method: 'DELETE'})
          .then(()=>{
            setCurrentCheckInID(null)
            sessionStorage.clear()
        })
    }

    return (
        <CheckInContext.Provider 
            value ={{
                      accidentalCheckin,
                      setAccidentalCheckin,
                      currentCheckInID,
                      setCurrentCheckInID,
                      checkOut,
                      handleCheckInFormSubmission,
                      deleteCheckIn,
                      isModalOpen,
                      setIsModalOpen
                    }}
        >
            {children}
        </CheckInContext.Provider>
    )
}
export {CheckInContext, CheckInProvider}
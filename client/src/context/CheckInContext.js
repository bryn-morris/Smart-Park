import { createContext, useState, useContext, useEffect } from "react";
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
    const [seconds, setSeconds] = useState(0)
    const [intervalID, setIntervalID] = useState(null)

    ////////////////////////////////////////////////

    useEffect(()=>{

      if(currentCheckInID) {
        startTimer();
      }

      return(()=>{
        if(currentCheckInID){
          clearInterval(intervalID);
        }
      })

    },[currentCheckInID])

    ///////////// Check-In Functions ///////////////

    function checkOut () {

        const configObj = {
          method: 'PATCH',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({actualLengthOfStay: seconds})
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

    ///////////// Timer Functions ///////////////
    
    function startTimer(){
        setIntervalID(setInterval(()=>{
          setSeconds((prevSeconds) => prevSeconds+1)
        }, 1000))
      }
    
    function endTimer(){
        clearInterval(intervalID)
        setSeconds(0)
    }

    return (
        <CheckInContext.Provider 
            value ={{
                      accidentalCheckin,
                      setAccidentalCheckin,
                      currentCheckInID,
                      setCurrentCheckInID,
                      checkOut,
                      startTimer,
                      endTimer,
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
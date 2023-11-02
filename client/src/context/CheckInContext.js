import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import fetchData from "../utils/fetch_util";

const CheckInContext = createContext()

function CheckInProvider({children}) {

    const { setIsReLogOpen } = useContext(AuthContext)

    const [accidentalCheckin, setAccidentalCheckin ] = useState(false)
    const [currentCheckInID, setCurrentCheckInID] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [intervalID, setIntervalID] = useState(null)

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
          setSeconds(seconds => seconds+1)
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
                    }}
        >
            {children}
        </CheckInContext.Provider>
    )
}
export {CheckInContext, CheckInProvider}
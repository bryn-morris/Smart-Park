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
            localStorage.clear()
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
            localStorage.setItem('checkInID', newVisit.id)

            setRecentParks(()=>{return(
              [newVisit.newVisit,...recentParks]
            )})      
        })
    }

    function deleteCheckIn(){

        fetchData(`/visits/${parseInt(currentCheckInID)}`, setIsReLogOpen, {method: 'DELETE'})
          .then((deletedPark)=>{

            setRecentParks(()=>{
              return(
                [...recentParks].filter((eachPark)=>{
                  return(eachPark.id !== deletedPark.park_id)
                })
              )
            })
            
            setCurrentCheckInID(null)
            localStorage.clear()
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
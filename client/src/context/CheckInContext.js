import { createContext, useState, useContext, useEffect} from "react";
import { AuthContext } from "./AuthContext";
import { DogParkContext } from "./DogParkContext";
import fetchData from "../utils/fetch_util";
import handleLocalStorage from "../utils/handleLocalStorage_util";

const CheckInContext = createContext()

function CheckInProvider({children}) {

    const { setIsReLogOpen} = useContext(AuthContext)
    const { recentParks, setRecentParks } = useContext(DogParkContext)

    const [accidentalCheckin, setAccidentalCheckin ] = useState(false)
    const [checkInID, setCheckInID] = useState(()=>{
      return localStorage.getItem('checkInID') || null
    })
    const [isModalOpen, setIsModalOpen] = useState(false)

    ///////////// useEffect for updating checkInID ///////////////

    useEffect(()=>{

      function updateCheckInKey(e){
        setCheckInID(localStorage.getItem('checkInID'))
      }

      function clearCheckInKey(e){
        setCheckInID(null)
      }

      // creates event listener to listen to storage event
      // which is how we will be able to tell if 
      // localStorage is updated
      window.addEventListener('ciKEY', updateCheckInKey)
      window.addEventListener('clearStorage', clearCheckInKey)

      //cleanup function
      return(()=> {
        window.removeEventListener('ciKEY', updateCheckInKey)
        window.removeEventListener('clearStorage', clearCheckInKey)
      })
    }, [])

    ///////////// Check-In Functions ///////////////

    function checkOut () {

        const configObj = {
          method: 'PATCH',
          headers: {'Content-Type':'application/json'},
          body: {},
        }
    
        fetchData(`/visits/${parseInt(checkInID)}`,setIsReLogOpen, configObj)
          .then(updatedVisit => {
            handleLocalStorage('clearStorage')
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
            // setCheckInID(newVisit.id)
            setAccidentalCheckin(true)
            handleLocalStorage('checkInID', newVisit.id, 'ciKEY')

            setRecentParks(()=>{return(
              [newVisit.newVisit,...recentParks]
            )})      
        })
    }

    function deleteCheckIn(){

        fetchData(`/visits/${parseInt(checkInID)}`, setIsReLogOpen, {method: 'DELETE'})
          .then((deletedPark)=>{

            setRecentParks(()=>{
              return(
                [...recentParks].filter((eachPark)=>{
                  return(eachPark.id !== deletedPark.park_id)
                })
              )
            })
            
            handleLocalStorage('clearStorage')
        })
    }

    return (
        <CheckInContext.Provider 
            value ={{
                      accidentalCheckin,
                      setAccidentalCheckin,
                      checkInID,
                      setCheckInID,
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
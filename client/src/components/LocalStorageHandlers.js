import { useEffect, useContext } from "react"
import { CheckInContext } from "../context/CheckInContext"
import { AuthContext } from "../context/AuthContext"


function LocalStorageHandlers(){

    const {setCheckInID} = useContext(CheckInContext)
    const {setAuthKey} = useContext(AuthContext)

    useEffect(()=>{

            const setStateMapping = {
                "ciKey": setCheckInID,
                "aKey": setAuthKey,
            }

            function updateState(event) {
                const setStateFunction = setStateMapping[event.detail.key]
                if (setStateFunction){
                    setStateFunction((prev)=>event.detail.storageValue)
                }
            }

            function clearState(event) {
                const setStateFunction = setStateMapping[event.detail.key]
                if (setStateFunction){
                    setStateFunction((prev)=>null)
                }
            }
      
            // creates event listeners to listen to storage event
            // which is how we will be able to tell if 
            // localStorage is updated

            window.addEventListener("addOrUpdate", updateState)
            window.addEventListener("clearKey", clearState)
      
            // //cleanup function
            return(()=> {
              window.removeEventListener('addOrUpdate', updateState)
              window.removeEventListener('clearKey', clearState)
            })
    },[setCheckInID, setAuthKey])

    return(
        <div/>
    )

}

export default LocalStorageHandlers
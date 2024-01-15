import { useEffect } from "react"


function LocalStorageHandlers(){

    useEffect(()=>{
        
            // function updateCheckInKey(){
            //   setCheckInID(localStorage.getItem('checkInID'))
            // }
      
            // function clearCheckInKey(){
            //   setCheckInID(null)
            // }
      
            // creates event listeners to listen to storage event
            // which is how we will be able to tell if 
            // localStorage is updated
            // window.addEventListener('ciKEY', updateCheckInKey)
            // window.addEventListener('clearStorage', clearCheckInKey)
      
            // //cleanup function
            // return(()=> {
            //   window.removeEventListener('ciKEY', updateCheckInKey)
            //   window.removeEventListener('clearStorage', clearCheckInKey)
            // })
    },[])

    return(
        <div>
        </div>
    )

}

export default LocalStorageHandlers
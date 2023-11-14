import { DogParkContext } from "../../../../context/DogParkContext"
import FavoriteParks from "./FavoriteParkListEntry"
import { useState, useContext } from "react"


function ProfileParks () {

    const {favoritedParksByUser} = useContext(DogParkContext)

    const initialCountObj = {
        startIndex : 0,
        endIndex : 5,
    }

    const [countObj, setCountObj] = useState(initialCountObj)
    const [visibleFavoriteParks, setVisibleFavoriteParks] = useState(favoritedParksByUser.slice(countObj["startIndex"], countObj["endIndex"]))

    function incrementFavParks () {
        if (countObj.endIndex !== favoritedParksByUser.length + 1) {
            setCountObj((prevState)=>{return({
                ...prevState,
                startIndex: prevState.startIndex + 1,
                endIndex: prevState.endIndex + 1,
            })})
        }}

    function decrementFavParks () {
        if(countObj.startIndex !== 0){
            setCountObj((prevState)=>{return({
                ...prevState,
                startIndex: prevState.startIndex - 1,
                endIndex: prevState.endIndex - 1,
            })})
        }

    }

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                favoriteparks
                {/* <FavoriteParks /> */}
            </div>
            <div className = "recentsContainer">
                reccentparks
            </div>
            <div className = "reviewsContainer">
                reviewedparks
            </div>
        </div>

        
    )
}

export default ProfileParks
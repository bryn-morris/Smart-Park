import { DogParkContext } from "../../../../context/DogParkContext"
import FavoritePark from "./FavoritePark"
import { useState, useContext } from "react"


function ProfileParks () {

    const {favoritedParksByUser} = useContext(DogParkContext)

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : 5,
    })

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

    function renderVisibleParks (parkArray) {
        return (parkArray.map((eachPark)=>{return(
            <FavoritePark />
        )})
        )
    }

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                <div className="leftArrow" onClick={decrementFavParks}/>
                <div className="rightArrow" onClick={incrementFavParks}/>
                <div className="parkCardContainer">
                    {renderVisibleParks(favoritedParksByUser.slice(
                        countObj['startIndex'],
                        countObj['endIndex']
                    ))}
                </div>
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
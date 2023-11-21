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
            <FavoritePark 
                eachPark = {eachPark}
                key = {eachPark.id}
            />
        )})
        )
    }

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                <div className="leftArrow" onClick={decrementFavParks}/>
                <div className="parkCardContainer">
                    <div 
                        className="cardContainer0"
                        style = {
                            favoritedParksByUser[countObj['startIndex']] ?
                            {border: "2px solid #212121"} : 
                            null
                        }
                    >
                        {
                            favoritedParksByUser[countObj['startIndex']] ?
                            <FavoritePark eachPark={favoritedParksByUser[countObj['startIndex']]} /> : 
                            null
                        }
                    </div>
                    <div 
                        className="cardContainer1"
                        style = {
                            favoritedParksByUser[countObj['startIndex'+1]] ?
                            {border: "2px solid #212121"} : 
                            null
                        }
                    >
                        {
                            favoritedParksByUser[countObj['startIndex'+1]] ?
                            <FavoritePark eachPark={favoritedParksByUser[countObj['startIndex'+1]]} /> : 
                            null
                        }
                    </div>
                    <div 
                        className="cardContainer2"
                        style = {
                            favoritedParksByUser[countObj['startIndex'+2]] ?
                            {border: "2px solid #212121"} : 
                            null
                        }
                    >
                        {
                            favoritedParksByUser[countObj['startIndex'+2]] ?
                            <FavoritePark eachPark={favoritedParksByUser[countObj['startIndex'+2]]}/> : 
                            null
                        }
                    </div>
                    <div 
                        className="cardContainer3"
                        style = {
                            favoritedParksByUser[countObj['startIndex'+3]] ?
                            {border: "2px solid #212121"} : 
                            null
                        }
                    >
                        {
                            favoritedParksByUser[countObj['startIndex'+3]] ?
                            <FavoritePark eachPark={favoritedParksByUser[countObj['startIndex'+3]]} /> : 
                            null
                        }
                    </div>
                </div>
                <div className="rightArrow" onClick={incrementFavParks}/>
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
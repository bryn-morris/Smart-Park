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

    // Could probably refactor this into a JS generator
    //  that stops when values are not present

    function generateFavParkContainers(containerQuant){

        // create an array that increments on value at a time
        // based on the containerQuant
        // for each value within that array
        // check to make sure a value exists at
        // favoritedParksByUser[countObj['startIndex']]
        // if it does not create null, if so
        // create the cardContainer${index}
        // and the datatypes and pass in the style component necessary

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
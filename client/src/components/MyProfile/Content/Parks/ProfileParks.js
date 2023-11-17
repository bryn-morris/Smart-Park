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

    // Current Solution to carousel, render 
    // four boxes that have a fixed position, 
    // cardContainers 0-3, when arrow is clicked 
    // start index is changed and the values that
    // are passed to each of these containers
    // (representing each park's data) increments 
    // or decrements. 
    // Will need to reorganize logic for 
    // the increment and decrement functions. 
    // Will need to reorganize scss and likely 
    // extract out cardContainer styling to a mixin 
    // to reduce repetition. 
    // Also need to figure out how to make card 
    // div and image div empty when no data is 
    // passed in (ie if a user only has one
    // favorite park) - this issue will likely 
    // take care of itself. 

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                <div className="leftArrow" onClick={decrementFavParks}/>
                <div className="rightArrow" onClick={incrementFavParks}/>
                <div className="parkCardContainer">
                    <div className="cardContainer0">
                        <FavoritePark eachPark={favoritedParksByUser[startIndex]} />
                    </div>
                    <div className="cardContainer1">
                        <FavoritePark eachPark={favoritedParksByUser[startIndex+1]} />
                    </div>
                    <div className="cardContainer2">
                        <FavoritePark eachPark={favoritedParksByUser[startIndex+2]} />
                    </div>
                    <div className="cardContainer3">
                        <FavoritePark eachPark={favoritedParksByUser[startIndex+3]} />
                    </div>
                    {/* {renderVisibleParks(favoritedParksByUser.slice(
                        countObj['startIndex'],
                        countObj['endIndex'],
                    ))} */}
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
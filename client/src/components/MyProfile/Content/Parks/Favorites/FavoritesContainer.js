import { useContext, useState } from "react"
import { Icon } from "semantic-ui-react"

import { DogParkContext } from "../../../../../context/DogParkContext"
import FavoritePark from "./FavoritePark"
import FavArrow from "./FavArrow"
import { incrementParks, decrementParks } from "../../../../helpers/parksArrowHelpers"

function FavoritesContainer () {

    const {favoritedParksByUser} = useContext(DogParkContext)

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : 5,
    })

    const incrementArrowLogic = countObj.endIndex !== favoritedParksByUser.length + 2
    const decrementArrowLogic = countObj.startIndex !== 0

    // Could probably refactor this into a JS generator
    //  that stops when values are not present

    function generateFavParkContainers(containerQuant, ctObj){
        
        const parkArray = Array.from({length: containerQuant}, (_,index)=>index);
        const borderStyle = {border: "2px solid #212121"}

        return parkArray.map((eachIndex)=>{

            const favPark = favoritedParksByUser[ctObj['startIndex']+ eachIndex]

            if(favPark){
                return(
                    <div 
                        className={`cardContainer${eachIndex}`}
                        style = {borderStyle}
                    >
                        <FavoritePark key={eachIndex} eachPark={favPark} />
                    </div>
                )
            } else{
                return (
                    <div 
                        className={`cardContainer${eachIndex}`}
                        key = {eachIndex}
                    />
                )
            }       
        })
    }

    return(
        <div className = "favoritesContainer">
                <FavArrow 
                    arrowDirection="left"
                    favArrowFunction = {()=>decrementParks(decrementArrowLogic, setCountObj)}
                    arrowLogic={decrementArrowLogic}
                />
                <div className="parkCardContainer">
                    <div className="titleContainer">    
                        <div className="title">
                            <Icon name = "heart"/>
                            Favorite Parks
                        </div>
                    </div>
                    <div className="cardsContainer">
                        {generateFavParkContainers(4, countObj)}
                    </div>
                </div>
                <FavArrow 
                    arrowDirection="right"
                    favArrowFunction={()=>incrementParks(incrementArrowLogic, setCountObj)}
                    arrowLogic={incrementArrowLogic}
                />
            </div>
    )
}

export default FavoritesContainer
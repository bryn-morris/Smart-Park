import { Icon } from "semantic-ui-react"
import { useState } from "react"

import CarouselCard from "./CarouselCard"
import CarouselArrow from "./CarouselArrow"
import { incrementParks, decrementParks } from "../../../../helpers/parksArrowHelpers"

function Carousel ({dataArray}) {

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : 5,
    })

    const incrementArrowLogic = countObj.endIndex !== dataArray.length + 2
    const decrementArrowLogic = countObj.startIndex !== 0

    const hiddenIndices = {
        startIndex : countObj !== 0 ? countObj.startIndex-1 : 0,
        endIndex : countObj.endIndex + 1
    }

    // Could probably refactor this into a JS generator
    // that stops when values are not present
    
    // will likely need to change cards container from a 
    // flexbox to allow for overflow (which is then hidden)
    
    // render 2 card containers before and 2 card container after the
    // visible elements. 
    
    // each entry in the favorites list gets their own box. 
    // when an arrow is clicked those boxes physically move and pop out of existence after 2 indices are exceeded from the 
    // start index 

    // the first element in the hidden index, other than the 0th index, is rendered with teh hiddenCard style
    // as well as the last element
    // it is given the hiddenCard styling
    // this will trigger their transition

    function generateFavParkContainers(containerQuant, ctObj){
        
        const parkArray = Array.from({length: containerQuant}, (_,index)=>index);
        const borderStyle = {border: "2px solid #212121"}

        return parkArray.map((eachIndex)=>{

            const favPark = dataArray[ctObj['startIndex']+ eachIndex]

            if(favPark){
                return(
                    <div 
                        className="cardContainer"
                        style = {borderStyle}
                        key = {eachIndex}
                    >
                        <CarouselCard key={eachIndex} eachPark={favPark} />
                    </div>
                )
            }
            
            return null
        })
    }

    return(
        <div className = "carouselContainer">
            <CarouselArrow 
                arrowDirection="left"
                carArrowFunction = {()=>decrementParks(decrementArrowLogic, setCountObj)}
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
            <CarouselArrow
                arrowDirection="right"
                carArrowFunction={()=>incrementParks(incrementArrowLogic, setCountObj)}
                arrowLogic={incrementArrowLogic}
            />
        </div>
    )
}

export default Carousel
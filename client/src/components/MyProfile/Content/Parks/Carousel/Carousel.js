import { Icon } from "semantic-ui-react"
import { useState } from "react"

import CarouselCard from "./CarouselCard"
import CarouselArrow from "./CarouselArrow"
import { incrementParks, decrementParks } from "../../../../helpers/parksArrowHelpers"

function Carousel ({dataArray}) {

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : Math.min(4, dataArray.length),
    })

    const incrementArrowLogic = countObj.endIndex !== dataArray.length + 1;
    const decrementArrowLogic = countObj.startIndex > 0;

    const hiddenIndices = {
        startIndex : countObj !== 0 ? countObj.startIndex-1 : 0,
        endIndex : countObj.endIndex + 1
    }

    // Could probably refactor this into a JS generator
    // that stops when values are not present

    // if dataArray has length of 3 or less, dataArray length is rendered, arrows are disabled
    // if dataArray has length of 4, 
        // 4 containers are initially rendered, left arrow is clicked and visible indices change, elements
        // outside of the visible index values +-1 are hidden with css styling

        // when an arrow is clicked, old hidden container is deleted, and container on the edge is shrunk
            // left arrow shrinks leftmost visible element
            

    function generateFavParkContainers(ctObj){
        
        const parkArray = Array.from({length: dataArray.length}, (_,index)=>index);
        const borderStyle = {border: "2px solid #212121"}

        return parkArray.map((eachIndex)=>{

            const favPark = dataArray[eachIndex]
            const isVisible = eachIndex >= ctObj.startIndex && eachIndex < ctObj.endIndex;

            if(favPark){
                return(
                    <div 
                        className={`cardContainer ${isVisible ? '' : 'hidden'}`}
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
                    {generateFavParkContainers(countObj)}
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
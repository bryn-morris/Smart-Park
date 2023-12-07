import { Icon } from "semantic-ui-react"
import { useState } from "react"

import CarouselPark from "./CarouselPark"
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
    
    // render one card container before and one card container after the
    // visible elements. When data moves into those spaces (arrow click)
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
                        className={`cardContainer${eachIndex}`}
                        style = {borderStyle}
                        key = {eachIndex}
                    >
                        <CarouselPark key={eachIndex} eachPark={favPark} />
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
import { Icon } from "semantic-ui-react"
import { useState } from "react"

import CarouselCard from "./CarouselCard"
import CarouselArrow from "./CarouselArrow"
import { incrementParks, decrementParks } from "../../../../helpers/parksArrowHelpers"

function Carousel ({dataArray, sectionTitle}) {

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : Math.min(4, dataArray.length),
    })

    const incrementArrowLogic = countObj.endIndex !== dataArray.length + 1;
    const decrementArrowLogic = countObj.startIndex > 0;

    function generateFavParkContainers(ctObj){
        
        const parkArray = Array.from({length: dataArray.length}, (_,index)=>index);
        const borderStyle = {border: "2px solid #212121"}

        return parkArray.map((eachIndex)=>{

            const favPark = dataArray[eachIndex]
            const isVisible = eachIndex >= ctObj.startIndex && eachIndex < ctObj.endIndex;

            return(
                <div 
                    className={`cardContainer ${isVisible ? '' : 'hidden'}`}
                    style = {borderStyle}
                    key = {eachIndex}
                >
                    <CarouselCard key={eachIndex} eachPark={favPark} />
                </div>
            )
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
                        {sectionTitle}
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
import { useState, useEffect } from "react"

import CarouselCard from "./CarouselCard"
import CarouselArrow from "./CarouselArrow"
import { incrementParks, decrementParks } from "../../../../helpers/parksArrowHelpers"

function Carousel ({dataArray, sectionTitle}) {

    const [countObj, setCountObj] = useState({
        startIndex : 0,
        endIndex : Math.min(3, dataArray.length),
    })

    const [incrementArrowLogic, setIncrementArrowLogic] = useState(false)

    useEffect(()=>{
        if (dataArray.length < 3){
            setIncrementArrowLogic(false)
        } else {
            setIncrementArrowLogic(countObj.endIndex !== dataArray.length + 1)
        }
    }, [
        setIncrementArrowLogic,
        countObj.endIndex,
        dataArray.length,
    ])

    const decrementArrowLogic = countObj.startIndex > 0;

    function generateFavParkContainers(ctObj){
        
        const parkArray = Array.from({length: dataArray.length}, (_,index)=>index);

        return parkArray.map((eachIndex)=>{

            const eachPark = dataArray[eachIndex]
            const isVisible = eachIndex >= ctObj.startIndex && eachIndex < ctObj.endIndex;

            return(
                <div 
                    className={`cardContainer ${isVisible ? '' : 'hidden'}`}
                    key = {eachIndex}
                >
                    <CarouselCard 
                        key={eachIndex} 
                        eachPark={eachPark} 
                        sectionTitle = {sectionTitle}
                    />
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
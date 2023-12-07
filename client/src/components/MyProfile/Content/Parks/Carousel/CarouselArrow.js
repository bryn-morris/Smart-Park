
function CarouselArrow({
    arrowDirection,
    carArrowFunction,
    arrowLogic
}) {

    // can't target anchor tags or pseudoselectors with
    // inline styling, will need to use something 
    // like radium to handle removing pseudoselector upon arrowLogic change. 

    return(
        <div 
            className={`${arrowDirection}Arrow`}
            onClick={
                arrowLogic === true ?
                carArrowFunction: null
            }
        />
    )
}

export default CarouselArrow
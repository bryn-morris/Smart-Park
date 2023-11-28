
function FavArrow({
    arrowDirection,
    favArrowFunction,
    arrowLogic
}) {

    // can't target anchor tags or pseudoselectors with
    // inline styling, will need to use something 
    // like radium to handle this. 

    return(
        <div 
            className={`${arrowDirection}Arrow`}
            onClick={
                arrowLogic === true ?
                favArrowFunction: null
            }
            // style = {styleLogicVariable}
        />
    )
}

export default FavArrow
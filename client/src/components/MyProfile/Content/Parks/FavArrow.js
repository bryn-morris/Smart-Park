
function FavArrow({
    arrowDirection,
    favArrowFunction,
    arrowLogic
}) {

    // Style Logic to add to arrow components
    let styleLogicVariable;
    if (arrowLogic){
        styleLogicVariable = null
    } else {
        styleLogicVariable = 
        {
            // remove hover,
            "" : "",
            // remove on click,
            "" : "",
            // remove background color
            "" : "",
            // remove clip path
            "" : "",
        }
    }

    return(
        <div 
            className={`${arrowDirection}Arrow`}
            onClick={favArrowFunction}
            style = {styleLogicVariable}
        />
    )
}

export default FavArrow
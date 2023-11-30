
export function incrementParks (arrowLogic, setFunction) {
    if (arrowLogic) {
        setFunction((prevState)=>{return({
            ...prevState,
            startIndex: prevState.startIndex + 1,
            endIndex: prevState.endIndex + 1,
        })})
    }
}

export function decrementParks (arrowLogic, setFunction) {
    if(arrowLogic){
        setFunction((prevState)=>{return({
            ...prevState,
            startIndex: prevState.startIndex - 1,
            endIndex: prevState.endIndex - 1,
        })})
    }
}
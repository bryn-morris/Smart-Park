export const handleFormInputChange = (state, setState) => {
    return (e) => {
        setState(
            ()=>{return{...state, [e.target.name]: e.target.value}}
        )
    }
}
import {useState} from "react";

function CheckOutForm({handleFormSubmission, dogParks, dogs}){

    const emptyFormObj = {
        dogParkName: '',
        dogName: '',
        lengthOfStay : ''
    }

    const [formObject, setFormObject] = useState(emptyFormObj)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleFormSubmission(formObject)
        setFormObject(emptyFormObj) 
    }

    const handleFormInputChange = (e) => {
        setFormObject(
            ()=>{return{...formObject, [e.target.name]: e.target.value}}
        )
    }

    return(
        <div>
            <form id = "checkInForm" onSubmit={handleFormSubmit} className ="ui form">
                <label>Dog Park:</label>
                <select onChange={handleFormInputChange} name="dogParkName" value={formObject.dogParkName}>
                    <option defaultValue='Dog Park' hidden>Dog Park</option>
                    {dogParks.map((eachDP)=>{
                        return(<option key={eachDP.id} >{eachDP.name}</option>)
                    })}
                </select>
                <br/>
                <label>Dog:</label>
                <select onChange={handleFormInputChange} name="dogName" value={formObject.dogName}>
                    <option defaultValue = 'Dog' hidden>Dog</option>
                    {dogs.map((eachD)=>{
                        return(<option key={eachD.id} >{eachD.name}</option>)
                    })}
                </select>
                <br/>
                <label>Length of Stay in Minutes:</label>
                <select onChange={handleFormInputChange} name="lengthOfStay" value={formObject.lengthOfStay}>
                    <option defaultValue = 'Length of Stay in Minutes' hidden>Length of Stay</option>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                    <option>90 min</option>
                    <option>120 min</option>
                </select>
                <br/>
            </form>
        </div>
    )
}

export default CheckOutForm
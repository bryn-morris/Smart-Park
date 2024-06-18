import {useState, useContext} from "react";
import {Form} from 'semantic-ui-react'

import { DogContext } from "../../context/DogContext";
import { DogParkContext } from "../../context/DogParkContext";
import { handleFormInputChange } from "../helpers/inputChangeHelper";
import { CheckInContext } from "../../context/CheckInContext";

export default function CheckOutForm(){

    const {dogs} = useContext(DogContext)
    const {dogParks} = useContext(DogParkContext)
    const {handleCheckInFormSubmission} = useContext(CheckInContext)

    const emptyFormObject = {
        dogParkName: '',
        dogName: '',
        lengthOfStay : ''
    }

    const [formObject, setFormObject] = useState(emptyFormObject)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleCheckInFormSubmission(formObject)
        setFormObject(emptyFormObject)
    }
    
    return(
        <div>
            <Form id = "checkInForm" onSubmit={handleFormSubmit} className ="ui form">
                <label>Dog Park:</label>
                <select onChange={handleFormInputChange(formObject, setFormObject)} name="dogParkName" value={formObject.dogParkName}>
                    <option defaultValue='Dog Park' hidden>Dog Park</option>
                    {dogParks.map((eachDP)=>{
                        return(<option key={eachDP.id} >{eachDP.name}</option>)
                    })}
                </select>
                <br/>
                <label>Dog:</label>
                <select onChange={handleFormInputChange(formObject, setFormObject)} name="dogName" value={formObject.dogName}>
                    <option defaultValue = 'Dog' hidden>Dog</option>
                    {dogs.map((eachD)=>{
                        return(<option key={eachD.id} >{eachD.name}</option>)
                    })}
                </select>
                <br/>
                <label>Estimated Length of Stay:</label>
                <select onChange={handleFormInputChange(formObject, setFormObject)} name="lengthOfStay" value={formObject.lengthOfStay}>
                    <option defaultValue = 'Length of Stay in Minutes' hidden>Length of Stay</option>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                    <option>90 min</option>
                    <option>120 min</option>
                </select>
                <br/>
            </Form>
        </div>
    )
}
import {useState} from "react";
import {Form, Dropdown} from 'semantic-ui-react'

function CheckOutForm({handleFormSubmission, dogParks, dogs}){

    const emptyFormObject = {
        dogParkName: '',
        dogName: '',
        lengthOfStay : ''
    }

    const [formObject, setFormObject] = useState(emptyFormObject)

    // const [selectedDogPark, setSelectedDogPark] = useState('')
    // const [selectedDogName, setSelectedDogName] = useState('')
    // const [selectedLOS, setSelectedLOS] = useState('')



    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleFormSubmission(formObject)
        setFormObject(emptyFormObject)
        // setSelectedDogPark('')
        // setSelectedDogName('')
        // setSelectedLOS('')
    }

    // const handleDogParkChange = (e) => {
    //     console.log(e.target)
    //     setSelectedDogPark(e.target.value)

    // }

    const handleFormInputChange = (e) => {
        
        setFormObject(
            ()=>{return{...formObject, [e.target.name]: e.target.value}}
        )
    }

    // const dogParkOptions = dogParks.map((eachDP)=>{
    //     return {
    //         key: eachDP.id,
    //         icon: 'tree',
    //         text: eachDP.name,
    //         value: eachDP.name, 
    //     }
    // })

    // const dogNameOptions = dogs.map((eachDog)=>{
    //     return {
    //         key: eachDog.id,
    //         icon: 'paw',
    //         text: eachDog.name,
    //         value: eachDog.name, 
    //     }
    // })

    // const losOptions = [
    //     {
    //         key: 1,
    //         icon: 'time',
    //         text: '15 min',
    //         value: '15 min', 
    //     },
    //     {
    //         key: 2,
    //         icon: 'time',
    //         text: '30 min',
    //         value: '30 min', 
    //     },
    //     {
    //         key: 3,
    //         icon: 'time',
    //         text: '45 min',
    //         value: '45 min', 
    //     },
    //     {
    //         key: 4,
    //         icon: 'time',
    //         text: '60 min',
    //         value: '60 min', 
    //     },
    //     {
    //         key: 5,
    //         icon: 'time',
    //         text: '75 min',
    //         value: '75 min', 
    //     },
    //     {
    //         key: 6,
    //         icon: 'time',
    //         text: '90 min',
    //         value: '90 min', 
    //     },
    // ]
    
    return(
        <div>
            <Form id = "checkInForm" onSubmit={handleFormSubmit} className ="ui form">
                <label>Dog Park:</label>
                {/* <Dropdown
                    placeholder = 'Choose Your Dog Park!'
                    fluid
                    selection
                    options = {dogParkOptions}
                    value = {selectedDogPark}
                    onChange = {handleDogParkChange}
                /> */}
                <select onChange={handleFormInputChange} name="dogParkName" value={formObject.dogParkName}>
                    <option defaultValue='Dog Park' hidden>Dog Park</option>
                    {dogParks.map((eachDP)=>{
                        return(<option key={eachDP.id} >{eachDP.name}</option>)
                    })}
                </select>
                <br/>
                <label>Dog:</label>
                {/* <Dropdown
                    placeholder = 'Choose Your Dog!'
                    fluid
                    selection
                    options = {dogNameOptions}
                    value = {selectedDogName}
                    onChange = {(e)=>setSelectedDogName(e.target.value)}
                /> */}
                <select onChange={handleFormInputChange} name="dogName" value={formObject.dogName}>
                    <option defaultValue = 'Dog' hidden>Dog</option>
                    {dogs.map((eachD)=>{
                        return(<option key={eachD.id} >{eachD.name}</option>)
                    })}
                </select>
                <br/>
                <label>Length of Stay in Minutes:</label>
                {/* <Dropdown
                    placeholder = 'Choose Your Time!'
                    fluid
                    selection
                    options = {losOptions}
                    value = {selectedDogName}
                    onChange = {(e)=>setSelectedLOS(e.target.value)}
                /> */}
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
            </Form>
        </div>
    )
}

export default CheckOutForm
import React, {useState} from 'react'
import {Form, Input} from 'semantic-ui-react'

function DogParkForm({handleAddDogPark}) {

  const emptyDogParkFormObj = {
    name : "",
    amenities: "",
    address: "",
    image: "",
  }

  const [dogParkFormObject, setDogParkFormObject] = useState(emptyDogParkFormObj)
    
  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddDogPark(dogParkFormObject)
    setDogParkFormObject(emptyDogParkFormObj)
  }

  const handleFormInputChange = (e) => {
    setDogParkFormObject(
        ()=>{return{...dogParkFormObject, [e.target.name]: e.target.value}}
    )
  }

  function generateInputField(labelName, type, value, placeholder){
   
    return(
      <div>
        <label>{labelName}</label>
        <Input
          type = {type}
          value = {value}
          placeholder = {placeholder}
          onChange = {handleFormInputChange}
          name = {placeholder}
        />
      </div>)   
  }
  
  return (
    <Form id  = "dogParkForm" onSubmit={handleSubmit}>
      {generateInputField("Dog Park Name: ", "text", dogParkFormObject.name, "name")}
      {generateInputField("Amenities: ", "text", dogParkFormObject.amenities, "amenities")}
      {generateInputField("Address: ", "text", dogParkFormObject.address, "address")}
      {generateInputField("Image URL: ", "text", dogParkFormObject.image, "image")}
    </Form>
  );
}
export default DogParkForm
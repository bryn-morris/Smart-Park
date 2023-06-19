import { useContext, useState } from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'
import { DogParkContext } from '../../context/DogParkContext'

function EditDogParkForm({eachDogPark, setIsEditModalOpen}){

    const startingDPFormObject = { 
        name: eachDogPark.name,
        address: eachDogPark.address,
        amenities: eachDogPark.amenities,
        image: eachDogPark.image
    }

    const [dpFormObject, setDPFormObject] = useState(startingDPFormObject)

    const {dogParks, setDogParks} = useContext(DogParkContext)

    const handleSubmitDPEdit = (e) => {
        e.preventDefault();

        fetch(`/dogparks/${eachDogPark.id}`, {
            method : 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dpFormObject)
        })
            .then(r=>r.json())
            .then(patchedDogPark => {
                setDogParks(
                    dogParks.map((eachDP)=>{
                        if(patchedDogPark.id === eachDP.id){
                            return patchedDogPark
                        }
                        return eachDP
                    })
                )
            })

        setIsEditModalOpen(false);
    }

    const handleFormInputChange = (e) => {
        setDPFormObject(
            ()=>{return{...dpFormObject, [e.target.name]: e.target.value}}
        )
    }

    return(
        <Form id = 'editDogParkForm' onSubmit = {handleSubmitDPEdit}>
            <br/>
            <label>Name</label>
            <Input
                type = 'text'
                name = 'name'
                value = {dpFormObject.name}
                onChange={handleFormInputChange} 
                placeholder = 'name'
            />
            <br/>
            <label>Address</label>
            <Input
                type = 'text'
                name = 'address'
                value = {dpFormObject.address}
                onChange={handleFormInputChange} 
                placeholder = 'address'
            />
            <br/>
            <label>Amenities</label>
            <TextArea
                type = 'text'
                name = 'amenities'
                value = {dpFormObject.amenities}
                onChange={handleFormInputChange} 
                placeholder = 'amenities'            
            />
            <br/>
            <label>Image</label>
            <Input
                type = 'text'
                name = 'image'
                value = {dpFormObject.image}
                onChange={handleFormInputChange} 
                placeholder = 'image'            
            />
        </Form>
    )
}

export default EditDogParkForm
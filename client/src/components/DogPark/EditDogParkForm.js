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

    const createInputOption = (label,type, name, value) => {
        return(
            <div>
                <br/>
                <label>{label}</label>
                {label === "Amenities" 
                    ?
                    <TextArea
                        type = {type}
                        name = {name}
                        value = {value}
                        onChange = {handleFormInputChange}
                        placeholder = {name}
                    >
                    </TextArea> 
                    : 
                    <Input
                        type = {type}
                        name = {name}
                        value = {value}
                        onChange = {handleFormInputChange}
                        placeholder = {name}
                    >
                    </Input>
                }   
            </div>
        );
    }

    return(
        <Form id = 'editDogParkForm' onSubmit = {handleSubmitDPEdit}>
            {createInputOption("Name","text","name",dpFormObject.name)}
            {createInputOption("Address","text","address",dpFormObject.address)}
            {createInputOption("Amenities","text","amenities",dpFormObject.amenities)}
            {createInputOption("Image", "text", "image", dpFormObject.image)}
        </Form>
    )
}

export default EditDogParkForm
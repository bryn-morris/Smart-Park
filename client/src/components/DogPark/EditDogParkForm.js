import { useContext, useState } from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'

import { DogParkContext } from '../../context/DogParkContext'
import { handleFormInputChange } from '../helpers/helperFunctions'
import { AuthContext } from "../../context/AuthContext"
import fetchData from '../../utils/fetch_util'


function EditDogParkForm({eachDogPark, setIsEditModalOpen}){

    const startingDPFormObject = { 
        name: eachDogPark.name,
        address: eachDogPark.address,
        amenities: eachDogPark.amenities,
        image: eachDogPark.image
    }

    const [dpFormObject, setDPFormObject] = useState(startingDPFormObject)

    const {dogParks, setDogParks} = useContext(DogParkContext)
    const { setIsReLogOpen } = useContext(AuthContext)


    const handleSubmitDPEdit = (e) => {
        e.preventDefault();

        const dpEditConfigObj = {
            method : 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dpFormObject)
        }

        fetchData(`/dogparks/${eachDogPark.id}`, setIsReLogOpen, dpEditConfigObj)
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
                        onChange = {handleFormInputChange(dpFormObject, setDPFormObject)}
                        placeholder = {name}
                    >
                    </TextArea> 
                    : 
                    <Input
                        type = {type}
                        name = {name}
                        value = {value}
                        onChange = {handleFormInputChange(dpFormObject, setDPFormObject)}
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
import React, { useState } from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'
import DogCard from './DogCard'


function MyDogCards({dog_parks, dog, showRemainingDogs, updatedDogs}) {
    const [dogAttribute, setDogAttribute]= useState('')
    const [newInfo, setNewInfo] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(null)
    const handleAttributeChange = e => setDogAttribute(e.target.value)
    const handleNewInfo = e => setNewInfo(e.target.value)
    

    const deleteDog = () => {

        setIsModalOpen(false)

        fetch (`/dogs/${dog.id}`, {method:"DELETE"})
            .then(showRemainingDogs(dog.id))
        }

    const handleDogEdit = (e) => {
        e.preventDefault()
        setIsModalOpen(false)
    
        fetch (`/dogs/${dog.id}`, {
                method:"PATCH", 
                headers:{"Content-type":"application/json"}, 
                body: JSON.stringify({
                    [dogAttribute]: newInfo,
                })
                })
            .then (r => r.json())
            .then(editedDog => updatedDogs(editedDog))

            setNewInfo('')
            setDogAttribute('')
        }

  return (
    <div style={{
        margin:"auto", 
        alignSelf:"center", 
        width:"20%", 
        padding:"30px"}}
    >
        <DogCard 
            dog_parks = {dog_parks} 
            {...dog}
        />
        <Modal
            onClose={() =>setIsModalOpen(false)}
            onOpen={() => setIsModalOpen(true)}
            open={isModalOpen}
            trigger={<Button className = "big ui button black modalbutton">Edit Dog</Button>}
            size= 'small'
        >
            <Modal.Header>Edit Doggo!</Modal.Header>
            <Modal.Content>
            <Form id = "editDog" onSubmit={handleDogEdit}>
                <label>What is it you want to edit?</label>
                <select onChange={handleAttributeChange} value={dogAttribute}>
                    <option defaultValue = 'What To Edit' hidden>What to edit</option>
                    <option>name</option>
                    <option>weight</option>
                    <option>age</option>
                    <option>image</option>
                    <option>breed</option>
                </select>
                <br />
                <input 
                    type="text" 
                    placeholder="New info..." 
                    onChange={handleNewInfo} 
                    value={newInfo} 
                />
            </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    form = "editDog"
                    type = "submit"
                >
                    Submit
                </Button>
                <Button
                    onClick={deleteDog}
                >
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    </div>
  )
}

export default MyDogCards
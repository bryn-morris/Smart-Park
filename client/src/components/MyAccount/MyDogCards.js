import React, { useState } from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'


function MyDogCards({id, name, breed, weight, age, image, showRemainingDogs, updatedDogs}) {
    const [dogAttribute, setDogAttribute]= useState('')
    const [newInfo, setNewInfo] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(null)
    const handleAttributeChange = e => setDogAttribute(e.target.value)
    const handleNewInfo = e => setNewInfo(e.target.value)
    

    const deleteDog = () => {
        fetch (`http://127.0.0.1:5555/dogs/${id}`, {method:"DELETE"})
            .then(showRemainingDogs(id))
        }

    const handleDogEdit = (e) => {
        e.preventDefault()
    
        fetch (`http://127.0.0.1:5555/dogs/${id}`, {
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
    <div>
        <img src = {image} alt = 'dog'/>
        <h1>{name}</h1>
        <h2>{breed}</h2>
        <h3>{weight}</h3>
        <h3>{age}</h3>
        
        
        <Modal
            onClose={() =>setIsModalOpen(false)}
            onOpen={() => setIsModalOpen(true)}
            open={isModalOpen}
            trigger={<Button className = "big ui button modalbutton">Edit Dog</Button>}
            size= 'small'
        >
        <Modal.Header>Edit Doggo!</Modal.Header>
              <Modal.Content>
                <Form onSubmit={handleDogEdit}>
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
                    <input type="text" placeholder="New info..." onChange={handleNewInfo} value={newInfo} />
                </Form>
              </Modal.Content>

              <Modal.Actions>
                  <Button
                    form = "addDog"
                    type = "submit"
                  >Submit
                  </Button>
                  <Button
                    onClick={deleteDog}
                  >Delete
                  </Button>
              </Modal.Actions>
        </Modal>
    </div>
  )
}

export default MyDogCards
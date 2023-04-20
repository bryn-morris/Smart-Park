import React, {useState} from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'

function NewDogForm({createDog, dogs, currentUser}) {
    
    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [weight, setWeight] = useState("")
    const [age, setAge] = useState("")
    const [image, setImage] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const newDog = {
      user_id: currentUser.id,
      name: name,
      breed: breed,
      weight: weight,
      age: age,
      image: image
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("/dogs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newDog)
      })
        .then(r=>r.json())
        .then(dogResponse =>createDog(dogResponse))
        e.target.reset()
    }
  
    
    return (
      <div className="new-dog-form">
        <Modal
            onClose={() =>setIsModalOpen(false)}
            onOpen={() => setIsModalOpen(true)}
            open={isModalOpen}
            trigger={<Button className = "big ui button modalbutton">Add Dog</Button>}
            size= 'small'
        >
        <Modal.Header>Let's Add A Doggo!</Modal.Header>

              <Modal.Content>
              <Form onSubmit={handleSubmit} id = 'addDog'>
                <br/>
                <label>Dog Name:</label>
                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Dog name" />
                <br/>
                <label>Dog Breed:</label>
                <input onChange={(e) => setBreed(e.target.value)} type="text" name="breed" placeholder="Breed" />
                <br/>
                <label>Dog Weight:</label>
                <input onChange={(e) => setWeight(e.target.value)} type="number" name="weight" placeholder="Dog Weight" />
                <br/>
                <label>Dog Age:</label>
                <input onChange={(e) => setAge(e.target.value)} type="number" name="age" placeholder="Dog Age" />
                <br/>
                <label>Dog Image URL:</label>
                <input onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="URL to Dog Profile photo" />
                <br/>
              </Form>
              </Modal.Content>

              <Modal.Actions>
                  <Button
                    form = "addDog"
                    type = "submit"
                  >Submit
                  </Button>
              </Modal.Actions>
        </Modal>
      </div>
    );
}

export default NewDogForm
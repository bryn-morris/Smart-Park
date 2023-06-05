import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import SearchDogPark from './SearchDogPark'
import {Button, Modal} from 'semantic-ui-react'


function DogPark({dogParks, addDogParkToState, finddpbi, specificPark}) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        eachDogPark = {eachDogPark}
        finddpbi = {finddpbi}
      />)
   })

   function handleAddDogPark (newDogPark) {

      fetch('/dogparks', {
        method: 'POST',
        body: newDogPark
      })
      .then(r=>r.ok ?
        r.json().then(data => addDogParkToState(data)) :
        alert('Please enter a valid url!')
      )

   }

  return (
  <div>
    <h1 className="dpHeader">Dog Parks</h1>
    
    {/* Search */}
    <div>
      <SearchDogPark specificPark = {specificPark}/>
    </div>
    
    {/* Dog Park Form */}
      <Modal
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
          open={isModalOpen}
          trigger={<Button style={{margin:20}}className = "big ui button black modalbutton">Add Dog Park</Button>}
          size= 'small'
      >
      <Modal.Header>Let's add a Dog Park</Modal.Header>
            <Modal.Content>
                <DogParkForm 
                  dogParks = {dogParks}
                  handleAddDogPark = {handleAddDogPark}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                  form = "dogParkForm"
                  type = "submit"
                >Submit
                </Button> 
            </Modal.Actions>
        </Modal>
    <div className="dog-parks-container">
      {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
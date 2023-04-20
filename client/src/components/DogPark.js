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
        {...eachDogPark}
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
    {/* Search */}
    <div>
      <SearchDogPark specificPark = {specificPark}/>
    </div>
    {/* Dog Park Form */}
      <Modal
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
          open={isModalOpen}
          trigger={<Button className = "big ui button modalbutton">Add Dog Park</Button>}
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
    {/* <div>
      {showDPForm ? (
        <div>
          <DogParkForm dogParks = {dogParks} addDogParkToState = {addDogParkToState}/> 
          <button onClick={handleShowDPForm}>Hide Form</button>
        </div>
        ) : (
        <button onClick={handleShowDPForm}>Add Dog Park</button>
        )
      }
    </div> */}
    <div>
      {/* Dog Park Cards */}
      {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
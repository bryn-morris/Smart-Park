import React, {useState, useContext} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import SearchDogPark from './SearchDogPark'
import {Button, Modal} from 'semantic-ui-react'
import { DogParkContext } from '../../context/DogParkContext'


function DogPark() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const {
    dogParks,
    setDogParks, 
    specificPark, 
    filteredParks
  } = useContext(DogParkContext) 

   function handleAddDogPark (newDogPark) {

      fetch('/dogparks', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newDogPark)
      })
      .then(r=>r.ok ?
        r.json().then(data => setDogParks([...dogParks, data])):
        r.json().then(response => alert(response))
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
      {filteredParks.map((eachDogPark)=>{
        return (<DogParkCard key = {eachDogPark.id} eachDogPark = {eachDogPark}/>)
      })}
    </div>
  </div>
  )
}

export default DogPark
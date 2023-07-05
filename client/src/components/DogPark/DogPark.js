import React, {useState, useContext} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import SearchDogPark from './SearchDogPark'
import {Button, Modal} from 'semantic-ui-react'
import { DogParkContext } from '../../context/DogParkContext'
import ReviewForm from './Reviews/ReviewForm'
import { ReviewContext } from '../../context/ReviewContext'


function DogPark() {

  const [createdDogPark, setCreatedDogPark] = useState({})
  const {isDPModalOpen, setIsDPModalOpen } = useContext(ReviewContext)

  const {
    handleAddReview, 
    isReviewFormRendered, 
    setIsReviewFormRendered,
  } = useContext(ReviewContext)

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
      r.json().then(data => {
        setDogParks([...dogParks, data])
        setCreatedDogPark(data)
        setIsReviewFormRendered(true)
      }):
      r.json().then(response => alert(response))
    )
  }

  function handleModalClose () {
  setIsReviewFormRendered(false)
  setIsDPModalOpen(false)
  }

  return (
  <div>
    <h1 className="dpHeader">Dog Parks</h1>
    
    {/* Search */}
    <div>
      <SearchDogPark specificPark = {specificPark}/>
    </div>
    
    {/* Dog Park Form Modal */}
    <Modal
        onClose={handleModalClose}
        onOpen={() => setIsDPModalOpen(true)}
        open={isDPModalOpen}
        trigger={<Button style={{margin:20}}className = "big ui button black modalbutton">Add Dog Park</Button>}
        size= 'small'
    >
      <Modal.Header>Let's add a Dog Park</Modal.Header>
      <Modal.Content>
          {isReviewFormRendered ? 
            <ReviewForm 
              handleAddReview = {handleAddReview}
              dogParkID = {createdDogPark.id}
            />
          : 
            <DogParkForm 
              handleAddDogPark = {handleAddDogPark}
            />
          }
      </Modal.Content>
      <Modal.Actions>
          <Button
            form = {isReviewFormRendered ? "reviewForm" : "dogParkForm"}
            type = "submit"
          >Submit
          </Button> 
      </Modal.Actions>
    </Modal>

    {/* Dog Park Renders */}
    <div className="dog-parks-container">
      {filteredParks.map((eachDogPark)=>{
        return (
          <DogParkCard 
            key = {eachDogPark.id} 
            eachDogPark = {eachDogPark}
          />)
      })}
    </div>
  </div>
  )
}

export default DogPark
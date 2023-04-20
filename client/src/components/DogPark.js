import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'




function DogPark({dogParks, addDogParkToState, selectedReviews, addNewReview}) {
  const [showDPForm, setShowDPForm] = useState(false)
  const handleShowDPForm = () =>{
    setShowDPForm(!showDPForm)
  }

  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
        addNewReview={addNewReview}
      />)
   })

  return (
  <div>
    {showDPForm ? (
      <div>
        <DogParkForm dogParks = {dogParks} addDogParkToState = {addDogParkToState}/> 
        <button onClick={handleShowDPForm}>Hide Form</button>
      </div>
      ) : (
      <button onClick={handleShowDPForm}>Add Dog Park</button>
      )
    }
    <div>
      {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
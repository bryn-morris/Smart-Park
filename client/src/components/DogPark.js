import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import Reviews from './Reviews'



function DogPark({dogParks, addDogParkToState, handleParkSelection, selectedReviews, addNewReview}) {
  const [showDPForm, setShowDPForm] = useState(false)
  const handleShowDPForm = () =>{
    setShowDPForm(!showDPForm)
  }

  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
        handleParkSelection={handleParkSelection}
        addNewReview={addNewReview}
      />)
   })


  const reviewComponents = selectedReviews.map(review =>{
    return (<Reviews key = {review.id} {...review}/>)
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
      {reviewComponents}
    </div>
    <div>
      {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
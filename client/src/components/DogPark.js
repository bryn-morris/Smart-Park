import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import Reviews from './Reviews'



function DogPark({dogParks, addDogParkToState, handleParkSelection, selectedReviews, addNewReview, specificPark}) {
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
    <div>
      <label htmlFor="search">Search Dog Parks:</label>
        <input
          type="text"
          placeholder="Type a Dog Park name to search..."
          onChange={(e) => specificPark(e.target.value)}
        />
    </div>
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
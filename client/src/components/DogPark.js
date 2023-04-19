import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import Reviews from './Reviews'



function DogPark({dogParks, addDogParkToState, handleParkSelection, selectedReviews}) {

  

  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
        handleParkSelection={handleParkSelection}
      />)
   })


  const reviewComponents = selectedReviews.map(review =>{
    return (<Reviews key = {review.id} {...review}/>)
  })


  return (
  <div>
    <DogParkForm 
      dogParks = {dogParks}
      addDogParkToState = {addDogParkToState}
    />
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
import React from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'



function DogPark({dogParks, addDogParkToState,test}) {

  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
      />)
   })

  return (
  <div>
    <DogParkForm 
      dogParks = {dogParks}
      addDogParkToState = {addDogParkToState}
    />
    <div>
      {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
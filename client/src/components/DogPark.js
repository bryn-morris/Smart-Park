import React from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'



function DogPark({dogParks}) {

  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
      />)
   })

  return (
    <div>
      {dogParkComponents}
    </div>
  )
}

export default DogPark
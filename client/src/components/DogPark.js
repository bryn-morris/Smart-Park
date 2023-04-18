import React from 'react'
import DogParkCard from './DogParkCard'

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
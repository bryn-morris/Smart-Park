import React, {useState} from 'react'
import DogParkCard from './DogParkCard'
import DogParkForm from './DogParkForm'
import SearchDogPark from './SearchDogPark'




function DogPark({dogParks, addDogParkToState, finddpbi, specificPark}) {
  const [showDPForm, setShowDPForm] = useState(false)

  const handleShowDPForm = () =>{
    setShowDPForm(!showDPForm)
  }
  
  const dogParkComponents = dogParks.map((eachDogPark)=>{
      return (
      <DogParkCard
        key = {eachDogPark.id}
        {...eachDogPark}
        finddpbi = {finddpbi}
      />)
   })

  return (
  <div>
    <div>
      <SearchDogPark specificPark = {specificPark}/>
    </div>
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
    </div>
    <div className="dog-parks-container">
    {dogParkComponents}
    </div>
  </div>
  )
}

export default DogPark
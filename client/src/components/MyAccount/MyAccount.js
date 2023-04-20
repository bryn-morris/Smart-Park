import React, { useEffect, useState } from 'react'
import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'



function MyAccount({dogs, showRemainingDogs, updatedDogs, createDog, currentUser}) {
    

    const myDogs = dogs.map((dog)=>{
        return(<MyDogCards key = {dog.id} {...dog} showRemainingDogs={showRemainingDogs} updatedDogs={updatedDogs}/>)
        }
    )

  return (
    <div>
      <div>
        <NewDogForm createDog={createDog} dogs={dogs} currentUser={currentUser}/>
      </div>
        {myDogs}
    </div>
  )
}

export default MyAccount
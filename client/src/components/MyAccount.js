import React, { useEffect, useState } from 'react'
import MyDogCards from './MyDogCards'



function MyAccount({dogs, showRemainingDogs, updatedDogs}) {
    

    const myDogs = dogs.map((dog)=>{
        return(<MyDogCards key = {dog.id} {...dog} showRemainingDogs={showRemainingDogs} updatedDogs={updatedDogs}/>)
        }
    )

  return (
    <div>
        {myDogs}
    </div>
  )
}

export default MyAccount
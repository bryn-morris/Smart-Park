import React, { useState } from 'react'


function MyDogCards({id, name, breed, weight, age, image, showRemainingDogs, updatedDogs}) {
    const [editForm, setEditForm] = useState(false)
    const [dogAttribute, setDogAttribute]= useState('')
    const [newInfo, setNewInfo] = useState('')
    const handleAttributeChange = e => setDogAttribute(e.target.value)
    const handleNewInfo = e => setNewInfo(e.target.value)
    
    const handleEditForm = () => {
        setEditForm(!editForm)
      }

    const deleteDog = () => {
        fetch (`http://127.0.0.1:5555/dogs/${id}`, {method:"DELETE"})
            .then(showRemainingDogs(id))
        }


    const handleDogEdit = (e) => {
        e.preventDefault()
    
        fetch (`http://127.0.0.1:5555/dogs/${id}`, {
                method:"PATCH", 
                headers:{"Content-type":"application/json"}, 
                body: JSON.stringify({
                    [dogAttribute]: newInfo,
                })
                })
            .then (r => r.json())
            .then(editedDog => updatedDogs(editedDog))

            setNewInfo('')
            setDogAttribute('')
        }


  return (
    <div>
        <img src = {image} alt = 'dog'/>
        <h1>{name}</h1>
        <h2>{breed}</h2>
        <h3>{weight}</h3>
        <h3>{age}</h3>
        
        {editForm ? (
            <form onSubmit={handleDogEdit}>
                <h3>Edit Dog</h3>
                <select onChange={handleAttributeChange} value={dogAttribute}>
                    <option>What to edit</option>
                    <option>name</option>
                    <option>weight</option>
                    <option>age</option>
                    <option>image</option>
                    <option>breed</option>
                </select>
                <br />
                <input type="text" placeholder="New info..." onChange={handleNewInfo} value={newInfo} />
                <button type="submit" className="primary">Done</button>
            </form>
            ) : (
                <button onClick={handleEditForm}> Edit Dog</button>
            )
        }

        <button onClick={deleteDog}>X</button>
    </div>
  )
}

export default MyDogCards
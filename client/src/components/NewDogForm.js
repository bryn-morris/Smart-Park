import React, {useState} from 'react'

function NewDogForm({createDog}) {
    
    const [user_id, setUserID] = useState("")
    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [weight, setWeight] = useState("")
    const [age, setAge] = useState("")
    const [image, setImage] = useState("")
  
    const newDog = {
      user_id: user_id,
      name: name,
      breed: breed,
      weight: weight,
      age: age,
      image: image
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("http://127.0.0.1:5555/dogs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newDog)
      })
        .then(createDog(newDog))
        e.target.reset()
    }
  
    
    return (
      <div className="new-dog-form">
        <h2>Let's add your pup!</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setUserID(e.target.value)} type="number" name="userID" placeholder="Owner's ID" />
          <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Dog name" />
          <input onChange={(e) => setBreed(e.target.value)} type="text" name="breed" placeholder="Breed" />
          <input onChange={(e) => setWeight(e.target.value)} type="number" name="weight" placeholder="Dog Weight" />
          <input onChange={(e) => setAge(e.target.value)} type="number" name="age" placeholder="Dog Age" />
          <input onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="URL to Dog Profile photo" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default NewDogForm
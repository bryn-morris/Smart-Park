import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header"
import DogPark from "./DogPark"
import MyAccount from "./MyAccount"

function App() {

  const [dogParks, setDogParks] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(setDogParks)
  }, [])

  const [dogs, setDogs] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogs')
      .then(r=> r.json())
      .then(setDogs)
  }, [])

  const showRemainingDogs = (id) => {
    const newDogArray = dogs.filter(dogObj => {
      if(dogObj.id !== id)
      {
        return true
      }
    })
    setDogs(newDogArray)
  }

  const updatedDogs = (editedDog) => {
    const changedDogArr = dogs.map(dog => {
      return (dog.id !== editedDog.id ? dog : editedDog)
    })
    setDogs(changedDogArr)
  }

  


  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dogparks">
            <DogPark dogParks = {dogParks}/>
          </Route>
          <Route exact path="/myaccount">
            <MyAccount dogs = {dogs} showRemainingDogs = {showRemainingDogs} updatedDogs = {updatedDogs}/>
          </Route>
          <Route exact path="/checkin">
            <CheckIn/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

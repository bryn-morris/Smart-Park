import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header"
import DogPark from "./DogPark"
import MyAccount from "./MyAccount"


function App() {


  //  Only show thanks for checking on modal/cancel checkin modal once. After that
  // change modal button to check out and present checkout modal to check out???
  
  const [dogParks, setDogParks] = useState([])
  const [currentCheckInID, setCurrentCheckInID] = useState(null)

  // need to get dogs associated with user through session in our fetch
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(setDogParks)

    //use sessionStorage to check if currently checked in 
    const sessionCheckInID = sessionStorage.getItem('currentCheckInID')
    if (sessionCheckInID){
      setCurrentCheckInID(sessionCheckInID)
    }
  }, [])

  const [accidentalCheckin,setAccidentalCheckin ] = useState(false)

  function handleFormSubmission(formObj){
    // Update Backend with post to a route that creates a Visit Instance
    fetch('/visits', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formObj)
    })
    .then(r=>r.json())
    .then(newVisit => {
      setCurrentCheckInID(newVisit.id)
      setAccidentalCheckin(true)
      sessionStorage.setItem('currentCheckInID', newVisit.id)
    })
  }

  function deleteCheckIn(){
    fetch(`/visits/${parseInt(currentCheckInID)}`, {
      method: 'DELETE',
      })
    .then(()=>{
      setCurrentCheckInID(null)
      sessionStorage.clear()
    })
  }

  const [dogs, setDogs] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogs')
      .then(r=> r.json())
      .then(setDogs)
  }, [])

  const showRemainingDogs = (id) => {
    const newDogArray = dogs.filter(dogObj => {
      if(dogObj.id !== id){
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

  const addDogParkToState = (newDogParkObj) => {
    setDogParks([newDogParkObj, ...dogParks]) 
  }

  const [seconds, setSeconds] = useState(0)

  function startTimer(){
    setInterval(()=>{
      setSeconds(seconds => seconds+1)
    }, 1000)
  }

  function endTimer(){
    clearInterval(setSeconds(0))
  }

  function checkOut () {
    fetch(`/visits/${parseInt(currentCheckInID)}`,{
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({actualLengthOfStay: seconds})
    })
      .then(r=>r.json())
      .then(updatedVisit => {
        setCurrentCheckInID(null)
        sessionStorage.clear()
      })
  }

  const propsObjectToHome = {
    handleFormSubmission: handleFormSubmission,
    dogParks: dogParks,
    deleteCheckIn: deleteCheckIn,
    currentCheckInID: currentCheckInID,
    setAccidentalCheckin: setAccidentalCheckin,
    accidentalCheckin: accidentalCheckin,
    checkOut: checkOut,
    endTimer: endTimer,
    startTimer: startTimer,
  }
  
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home 
              {...propsObjectToHome}
            />
          </Route>
          <Route exact path="/dogparks">
            <DogPark dogParks = {dogParks} addDogParkToState={addDogParkToState}/>
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

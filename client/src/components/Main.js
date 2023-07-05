import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header";
import DogPark from "./DogPark/DogPark";
import MyAccount from "./MyAccount/MyAccount";
import { DogContext } from '../context/DogContext';
import AboutUs from "./AboutUs";
import { DogParkContext } from "../context/DogParkContext";

function Main() {

  ///////////////////////////////////////
  /////////     Check-in & Out
  ///////////////////////////////////////
 
  const [currentCheckInID, setCurrentCheckInID] = useState(null)

  const { dogs, setDogs } = useContext(DogContext)
  const { setDogParks } = useContext(DogParkContext) 

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(data => setDogParks(data))
      

    //use sessionStorage to check if currently checked in 
    const sessionCheckInID = sessionStorage.getItem('currentCheckInID')
    if (sessionCheckInID){
      setCurrentCheckInID(sessionCheckInID)
    }
  }, [setDogParks])

  const [seconds, setSeconds] = useState(0)
  const [intervalID, setIntervalID] = useState(null)

  function startTimer(){
    setIntervalID(setInterval(()=>{
      setSeconds(seconds => seconds+1)
    }, 1000))
  }

  function endTimer(){
    clearInterval(intervalID)
    setSeconds(0)
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

  const [accidentalCheckin,setAccidentalCheckin ] = useState(false)

  function handleFormSubmission(formObj){
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

  ///////////////////////////////////////
  /////////     Dogs
  ///////////////////////////////////////

  const createDog = (newDog) => {
    setDogs([...dogs, newDog])
  }

  const showRemainingDogs = (id) => {
    const newDogArray = dogs.filter(dogObj => dogObj.id !== id)
    setDogs(newDogArray)
  }

  const updatedDogs = (editedDog) => {
    const changedDogArr = dogs.map(dog => {
      return (dog.id !== editedDog.id ? dog : editedDog)
    })
    setDogs(changedDogArr)
  }

  ///////////////////////////////////////
  /////////     Props Objects
  ///////////////////////////////////////

  const propsObjectToHome = {
    handleFormSubmission: handleFormSubmission,
    deleteCheckIn: deleteCheckIn,
    currentCheckInID: currentCheckInID,
    setAccidentalCheckin: setAccidentalCheckin,
    accidentalCheckin: accidentalCheckin,
    checkOut: checkOut,
    endTimer: endTimer,
    startTimer: startTimer,
  }

  const propsObjectToMyAccount = {
    showRemainingDogs: showRemainingDogs,
    updatedDogs: updatedDogs,
    createDog: createDog,
  }


  return (
    <div className='pageContainer'>
      <Header/>
      <main className = 'pageContent'>
        <Switch>
          <Route exact path="/">
            <Home 
              {...propsObjectToHome}
            />
          </Route>
          <Route exact path="/dogparks">
            <DogPark />
          </Route>
          <Route exact path="/myaccount">
            <MyAccount {...propsObjectToMyAccount}/>
          </Route>
          <Route exact path="/aboutus">
            <AboutUs/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default Main;

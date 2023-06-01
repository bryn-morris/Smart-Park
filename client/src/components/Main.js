import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header";
import DogPark from "./DogPark/DogPark";
import MyAccount from "./MyAccount/MyAccount";
import AboutUs from "./AboutUs";

function Main({currentUser, setCurrentUser, dogs, setDogs}) {
 
  const [dogParks, setDogParks] = useState([])
  const [currentCheckInID, setCurrentCheckInID] = useState(null)

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(data => setDogParks(data))
      

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

  // useEffect(()=>{
  //   fetch(`http://127.0.0.1:5555/dogs`)
  //     .then(r=> r.json())
  //     .then(setDogs)
  // }, [])

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

  const addDogParkToState = (newDogParkObj) => {
    setDogParks([newDogParkObj, ...dogParks]) 
  }

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

  const find_dog_park_by_id = (createdReview) => {
      
    // filter through dog parks to get the dog park associatd with the dog 
    // park id inside of created review

    dogParks.map( (eachDP) => {
      if (eachDP.id === createdReview.dog_park_id){
        eachDP.reviews.push(createdReview)
        return eachDP
      } else{
        return eachDP
      }
    }

    )}

  //search for dog park
  const [searchedPark, setSearchedPark] = useState('')
  
  const specificPark = (park) => {
    setSearchedPark(park.toLowerCase())
  }
  
  const filteredParks = dogParks.filter(park => park.name.toLowerCase().includes(searchedPark))

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
    dogs: dogs
  }

  const propsObjectToMyAccount = {
    dogs : dogs,
    showRemainingDogs: showRemainingDogs,
    updatedDogs: updatedDogs,
    createDog: createDog,
    currentUser: currentUser,
  }

  const propsObjectToDogPark = {
    specificPark: specificPark,
    finddpbi: find_dog_park_by_id,
    dogParks: filteredParks,
    addDogParkToState: addDogParkToState,
  }

  return (
    <div className='pageContainer'>
      <Header setCurrentUser= {setCurrentUser}/>
      <main className = 'pageContent'>
        <Switch>
          <Route exact path="/">
            <Home 
              {...propsObjectToHome}
            />
          </Route>
          <Route exact path="/dogparks">
            <DogPark {...propsObjectToDogPark} />
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

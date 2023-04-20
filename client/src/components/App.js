import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header";
import DogPark from "./DogPark";
import MyAccount from "./MyAccount";
import AboutUs from "./AboutUs";


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

  //fetch for dogs
  const [dogs, setDogs] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogs')
      .then(r=> r.json())
      .then(setDogs)
  }, [])

  //show dogs after adding one
  const createDog = (newDog) => {
    setDogs([...dogs, newDog])
  }
  
  //show dogs after deleting one
  const showRemainingDogs = (id) => {
      const newDogArray = dogs.filter(dogObj => {
        if(dogObj.id !== id){
          return true
        }
      })
      setDogs(newDogArray)
    }

  //show dogs after editing one  
  const updatedDogs = (editedDog) => {
      const changedDogArr = dogs.map(dog => {
        return (dog.id !== editedDog.id ? dog : editedDog)
      })
      setDogs(changedDogArr)
    }
  
  //show dog parks after adding one
  const addDogParkToState = (newDogParkObj) => {
      setDogParks([newDogParkObj, ...dogParks]) 
    }
  
  //checkin & checkout stuff  
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

  // //fetch for reviews
  
  const [reviews, setReviews] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/reviews')
      .then(r=> r.json())
      .then(setReviews)
  }, [])

  // //display reviews for specific park
  // const [parkId, setParkId] = useState('')
  // const handleParkSelection = (id) => {
  //    setParkId(id)
  //   }
  // const selectedReviews = reviews.filter(review => {
  //       if(review.dog_park_id == parkId)
  //       return true
  //   })

  // add new review  
  const addNewReview = (newReview) => {
    setReviews([newReview, ...reviews])
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
            <DogPark dogParks={dogParks} addDogParkToState={addDogParkToState} addNewReview={addNewReview}/>
          </Route>
          <Route exact path="/myaccount">
            <MyAccount dogs={dogs} showRemainingDogs={showRemainingDogs} updatedDogs={updatedDogs} createDog={createDog}/>
          </Route>
          <Route exact path="/checkin">
            <CheckIn/>
          </Route>
          <Route exact path="/aboutus">
            <AboutUs/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

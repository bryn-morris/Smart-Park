import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import DogPark from "./DogPark";
import MyAccount from "./MyAccount";
import AboutUs from "./AboutUs";

function Main({currentUser}) {
 
  //  Only show thanks for checking on modal/cancel checkin modal once. After that
  // change modal button to check out and present checkout modal to check out???
  
  const [dogParks, setDogParks] = useState([])
  const [currentCheckInID, setCurrentCheckInID] = useState(null)
  const [dogs, setDogs] = useState([])

  // need to get dogs associated with user through session in our fetch
  // const [user, setUser] = useState(false)
  // fetch('http://127.0.0.1:5555/login'), {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(currentUser)
  // }
  // .then(r=>r.json())
  // .then(console.log('success!'))
  
  
  
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/current-session')
      .then(r => {
        if (r.status === 200){
          r.json()
          .then(obj => setDogs(obj.dogs))
        } else {
          console.log('hello')
        }
      })
  },[] )


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

  
  // if (user === !user){
  //   return(
  //     <div>
  //       <Route exact path="/login">
  //         <LogIn/>
  //       </Route>
  //     </div>
  //   )
  // }
  // else{

  //fetch for reviews
  
  // const [reviews, setReviews] = useState([])
  // useEffect(()=>{
  //   fetch('/reviews')
  //     .then(r=> r.json())
  //     .then(setReviews)
  // }, [])


  // add newreview  
  

  //search for dog park
  const [searchedPark, setSearchedPark] = useState('')
  
  const specificPark = (park) => {
    setSearchedPark(park.toLowerCase())
  }
  
  const filteredParks = dogParks.filter(park => park.name.toLowerCase().includes(searchedPark))

  return (
    <div>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
            <Home 
              {...propsObjectToHome} dogs={dogs}
            />
          </Route>
          <Route exact path="/dogparks">
            <DogPark specificPark={specificPark} finddpbi = {find_dog_park_by_id} dogParks={filteredParks} addDogParkToState={addDogParkToState} />
          </Route>
          <Route exact path="/myaccount">
            <MyAccount dogs = {dogs} showRemainingDogs = {showRemainingDogs} updatedDogs = {updatedDogs} createDog={createDog}/>
          </Route>
          <Route exact path="/aboutus">
            <AboutUs/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
// }

export default Main;

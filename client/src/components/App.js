import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header"
import DogPark from "./DogPark"

function App() {

  const [dogParks, setDogParks] = useState([])
  const [currentCheckInID, setCurrentCheckInID] = useState(null)

  // need to get dogs associated with user through session in our fetch
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(setDogParks)

    //use sessionStorage to check if currently checked in 
    const sessionCheckInID = sessionStorage.getItem('currentCheckInID')
    if (sessionCheckInID) {
      setCurrentCheckInID(sessionCheckInID)
      console.log(sessionCheckInID)
    }
  }, [])

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

      sessionStorage.setItem('currentCheckInID', newVisit.id)
    })

    // Update FrontEnd and maybe change Element on Home page to show
    // that you are checked in?
  }

  function deleteCheckIn(){
    fetch(`/visits/${parseInt(currentCheckInID)}`, {
      method: 'DELETE',
      })
    .then(setCurrentCheckInID(null))
  }

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home 
              handleFormSubmission = {handleFormSubmission}
              dogParks = {dogParks}
              deleteCheckIn = {deleteCheckIn}
              currentCheckInID = {currentCheckInID}
            />
          </Route>
          <Route exact path="/dogparks">
            <DogPark dogParks = {dogParks}/>
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

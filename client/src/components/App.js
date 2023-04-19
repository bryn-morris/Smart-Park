import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header"
import DogPark from "./DogPark"

function App() {

  const [dogParks, setDogParks] = useState([])

  // need to get dogs associated with user through session in our fetch
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(setDogParks)
  }, [])

  // Creating Function to handle Modal Form Submission on Home Route
  function handleFormSubmission(formObj){
    // Update Backend with post to a route that creates a Visit Instance
    console.log(formObj)
    fetch('/visits', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formObj)
    })
    .then(r=>r.json())
    .then(console.log())

    // Update FrontEnd and maybe change Element on Home page to show
    // that you are checked in?
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

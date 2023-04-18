import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckIn from "./CheckIn";
import Header from "./Header"
import DogPark from "./DogPark"

function App() {

  const [dogParks, setDogParks] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/dogparks')
      .then(r=> r.json())
      .then(setDogParks)
  }, [])

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
          <Route exact path="/checkin">
            <CheckIn/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

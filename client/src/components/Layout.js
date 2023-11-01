import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import NavContainer from "./Navigation/NavContainer";
import DogPark from "./DogPark/DogPark";
import Profile from "./MyAccount/Profile";
import { DogContext } from '../context/DogContext';
import AboutUs from "./AboutUs";
import { DogParkContext } from "../context/DogParkContext";
import { FriendsContext } from "../context/FriendsContext";
import ReLogModal from "./Logging/ReLogModal";
import fetchData from "../utils/fetch_util";
import { AuthContext } from "../context/AuthContext";
import LogOutModal from "./Logging/LogOutModal";
import Settings from "./Settings";
import { CheckInContext } from "../context/CheckInContext";

function Layout() {

  const { dogs, setDogs } = useContext(DogContext)
  const { setDogParks } = useContext(DogParkContext)
  const { setFriendsList, setPendingFriendsList } = useContext(FriendsContext)
  const { setIsReLogOpen } = useContext(AuthContext) 
  const { setCurrentCheckInID } = useContext(CheckInContext)
  
  useEffect(()=>{

      fetchData('http://127.0.0.1:5555/dogparks', setIsReLogOpen)
        .then(data => setDogParks(data))

      fetchData('/friends', setIsReLogOpen)
        .then(friendsData => setFriendsList(friendsData))
      
      fetchData('/pending_friends', setIsReLogOpen)  
      .then(pendingFriendshipsData => setPendingFriendsList(pendingFriendshipsData))

      //use sessionStorage to check if currently checked in 
      const sessionCheckInID = sessionStorage.getItem('currentCheckInID')
      if (sessionCheckInID){
        setCurrentCheckInID(sessionCheckInID)
      }
    }, [
      setDogParks, 
      setFriendsList, 
      setPendingFriendsList, 
      setIsReLogOpen,
      setCurrentCheckInID
    ]
  )

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

  const propsObjectToProfile = {
    showRemainingDogs: showRemainingDogs,
    updatedDogs: updatedDogs,
    createDog: createDog,
  }

  return (
    <div className='site'>
      <ReLogModal />
      <NavContainer />
      <LogOutModal/>
      {/* <SettingsModal /> */}
      <Switch>
        <Route exact path="/dogparks">
          <DogPark />
        </Route>
        <Route exact path="/profile">
          <Profile {...propsObjectToProfile}/>
        </Route>
        <Route exact path="/aboutus">
          <AboutUs/>
        </Route>
        <Route exact path="/settings">
          <Settings/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;

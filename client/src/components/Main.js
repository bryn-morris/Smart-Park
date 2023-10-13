import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import DogPark from "./DogPark/DogPark";
import MyAccount from "./MyAccount/MyAccount";
import { DogContext } from '../context/DogContext';
import AboutUs from "./AboutUs";
import { DogParkContext } from "../context/DogParkContext";
import { FriendsContext } from "../context/FriendsContext";
import FriendListElement from "./FriendsList/FriendListElement";
import FriendsListButton from "./FriendsList/FriendsListButton";
import ReLogModal from "./Logging/ReLogModal";
import fetchData from "../utils/fetch_util";
import { AuthContext } from "../context/AuthContext";

function Main() {

  ///////////////////////////////////////
  /////////     Check-in & Out
  ///////////////////////////////////////
 
  
  const [accidentalCheckin,setAccidentalCheckin ] = useState(false)
  const [currentCheckInID, setCurrentCheckInID] = useState(null)

  const { dogs, setDogs } = useContext(DogContext)
  const { setDogParks } = useContext(DogParkContext)
  const { setFriendsList, setPendingFriendsList } = useContext(FriendsContext)
  const { setIsReLogOpen } = useContext(AuthContext) 

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
    setIsReLogOpen
  ]
)

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

    const configObj = {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({actualLengthOfStay: seconds})
    }

    fetchData(`/visits/${parseInt(currentCheckInID)}`,setIsReLogOpen, configObj)
      .then(updatedVisit => {
        setCurrentCheckInID(null)
        sessionStorage.clear()
      })
  }

  function handleFormSubmission(formObj){

    const getVisitConfigObj = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formObj)
    }

    fetchData('/visits', setIsReLogOpen, getVisitConfigObj)
      .then(newVisit => {
        setCurrentCheckInID(newVisit.id)
        setAccidentalCheckin(true)
        sessionStorage.setItem('currentCheckInID', newVisit.id)
      })
  }

  function deleteCheckIn(){

    fetchData(`/visits/${parseInt(currentCheckInID)}`, setIsReLogOpen, {method: 'DELETE'})
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
  /////////     Friendship
  ///////////////////////////////////////

  const [isFriendsModalShowing, setIsFriendsModalShowing] = useState(false)

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

  const propsObjectToFriendsListButton = {
    isFriendsModalShowing: isFriendsModalShowing,
    setIsFriendsModalShowing: setIsFriendsModalShowing,
  }

  return (
    <div className='site'>
      <Header/>
      <ReLogModal/>
      <main className = 'site Content'>
      <FriendsListButton {...propsObjectToFriendsListButton}/>
      {isFriendsModalShowing ? <FriendListElement /> : null}
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

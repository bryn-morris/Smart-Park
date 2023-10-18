import React, {useState, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import io from 'socket.io-client'

import { AuthContext } from '../../context/AuthContext';
import { DogContext } from '../../context/DogContext';
import { WebSocketContext } from '../../context/WebSocketContext';
import Routing from "../Routing"
import fetchData from '../../utils/fetch_util';
import LoginPage from './LoginPage';

function Logging() {

  const [logIn, setLogIn] = useState(true)
  
  const {  setDogs } = useContext(DogContext)
  const { currentUser, setCurrentUser, setIsReLogOpen } = useContext(AuthContext)
  const { setFriendSocket } = useContext(WebSocketContext)

  const history = useHistory()

  const handleSubmit = (e, userFormObject, setUserFormObject, emptyFormObject) => {

    e.preventDefault()

    const authConfigObj = {
      method: "POST",
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userFormObject)
    }

    // Authentication Fetch
    fetchData(`/${logIn ? 'login' : 'signup' }`,
      setIsReLogOpen,
      authConfigObj,
    )
    .then(user=>{
      setCurrentUser(user);
      setDogs(user.dogs);
      setFriendSocket(()=> io.connect('http://localhost:5555/friends-socket',{
        transport: ['websocket'],
        withCredentials: true,
      }))
      history.push("/");
    })
    
    setUserFormObject(emptyFormObject)
  }

  const loginPagePropsObj = {
    logIn : logIn,
    handleSubmit: handleSubmit,
    setLogIn: setLogIn,
  }

  return (
    currentUser ? <Routing /> : <LoginPage {...loginPagePropsObj}/>
  );
}

export default Logging;
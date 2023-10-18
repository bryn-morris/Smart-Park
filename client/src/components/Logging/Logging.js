import React, {useState, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route, useHistory } from "react-router-dom";
import { Input} from 'semantic-ui-react'
import io from 'socket.io-client'

import { AuthContext } from '../../context/AuthContext';
import { DogContext } from '../../context/DogContext';
import { WebSocketContext } from '../../context/WebSocketContext';
import Main from "../Main"
import { handleFormInputChange } from '../helpers/helperFunctions';
import fetchData from '../../utils/fetch_util';
import LoginPage from './LoginPage';

function Logging() {

  const [logIn, setLogIn] = useState(true)

  const emptyFormObject = 
    logIn ? 
      { username:"", password:""}:
      { username:"", password:"", image:"",}
  
  const [userFormObject, setUserFormObject] = useState(emptyFormObject)
  

  const {  setDogs } = useContext(DogContext)
  const { currentUser, setCurrentUser, setIsReLogOpen } = useContext(AuthContext)
  const { setFriendSocket } = useContext(WebSocketContext)


  const history = useHistory()

  const handleSubmit = (e) => {
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

  const createLoggingInput = (label, placeholder, type, value, children) => {

    return(
      <div className='field'>
        <Input
          label = {label}
          labelPosition='left corner'
          placeholder = {placeholder}
          onChange = {handleFormInputChange(userFormObject,setUserFormObject)}
          type = {type}
          name = {placeholder}
          value = {value}
        />
        {children}
      </div>
    )
  }

  const loginPagePropsObj = {
    logIn : logIn,
    handleSubmit: handleSubmit,
    createLoggingInput: createLoggingInput,
    userFormObject: userFormObject,
    setLogIn: setLogIn,
  }

  return (
    currentUser ?
      <main>
        <Route path="/">
            <Main />
        </Route>
      </main>
      : 
      <LoginPage 
        {...loginPagePropsObj}
      />
  );
}

export default Logging;
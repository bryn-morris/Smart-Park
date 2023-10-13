import React, {useState, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route, useHistory } from "react-router-dom";
import {Form, Input, Icon} from 'semantic-ui-react'
import io from 'socket.io-client'

import { AuthContext } from '../../context/AuthContext';
import { DogContext } from '../../context/DogContext';
import { WebSocketContext } from '../../context/WebSocketContext';
import Main from "../Main"
import { handleFormInputChange } from '../helpers/helperFunctions';
import fetchData from '../../utils/fetch_util';

function Logging() {

  const [logIn, setLogIn] = useState(true)

  const emptyFormObject = 
    logIn ? 
      { username:"", password:""}:
      { username:"", password:"", image:"",}
  
  const [userFormObject, setUserFormObject] = useState(emptyFormObject)
  const [isPasswordVisible, setIsPasswordVisible] =useState(false)

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

  return (
    currentUser ?
      <main>
        <Route path="/">
            <Main />
        </Route>
      </main>
      : 
      <div>
        <div 
          className="ui center aligned huge header" 
          style={{margin:40}}
        >
          Welcome to SmartPark!
        </div>
        <div className="new-user-form">
          <div className="ui sizer vertical segment">
            <h2 className="ui center aligned large header" >
              {logIn ? "Login Here" : "Create A New Account"}
            </h2>
          </div>
            <Form className="ui form" onSubmit={handleSubmit}>
              {createLoggingInput({ icon: 'users' }, "username","text", userFormObject.username)}
              {createLoggingInput(
                { icon: 'asterisk' },
                "password",
                isPasswordVisible ? "text" : "password", 
                userFormObject.password,
                <Icon 
                  name = 'eye' 
                  size='large' 
                  onClick = {()=>setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            {logIn ? <div></div> : createLoggingInput({icon: 'image'}, "profile photo URL",
                "text", userFormObject.image)
            } 
              <button 
                className='fluid ui button' 
                type="submit"
              >
                Submit
              </button>
            </Form>
            <div className='ui basic buttons'>
                <button 
                  onClick={()=>{setLogIn(!logIn)}} 
                  className='ui button'
                >
                  {logIn ? "Don't have an account? Create one!" : "Return to Login"}
                </button>
            </div>
        </div>
      </div>
  );
}

export default Logging;
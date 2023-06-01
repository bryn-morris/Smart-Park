import React, {useState, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route, useHistory } from "react-router-dom";
import {Form, Input, Icon} from 'semantic-ui-react'
import { AuthContext } from '../../context/AuthContext';
import { DogContext } from '../../context/DogContext';
import Main from "../Main"

function Logging() {

  ///////////////////////////////////////////
  /////////        State
  ///////////////////////////////////////////
  const [logIn, setLogIn] = useState(true)

  const emptyFormObject = 
    logIn ? 
      { username:"", password:""}:
      { username:"", password:"", image:""}
  
  const [userFormObject, setUserFormObject] = useState(emptyFormObject)
  const [isPasswordVisible, setIsPasswordVisible] =useState(false)

  ///////////////////////////////////////////
  /////////        Context
  ///////////////////////////////////////////

  const {  setDogs } = useContext(DogContext)
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:5555/${logIn ? 'login' : 'signup' }`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userFormObject)
    })
      .then(r => {
        if (r.ok) {return r.json().then(user=>{
          setCurrentUser(user);
          setDogs(user.dogs);
          history.push("/");
        })}
        else {return r.json().then(msg => alert(msg))};
      })
      setUserFormObject(emptyFormObject)

  }
 
  const handleFormInputChange = (e) => {
    setUserFormObject(
        ()=>{return{...userFormObject, [e.target.name]: e.target.value}}
    )
  }

  const createLoggingInput = (label, placeholder, type, value, children) => {

    return(
      <div className='field'>
        <Input
          label = {label}
          labelPosition='left corner'
          placeholder = {placeholder}
          onChange = {handleFormInputChange}
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
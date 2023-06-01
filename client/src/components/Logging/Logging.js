import React, {useState, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import {Form, Input} from 'semantic-ui-react'
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
  
  const [session, setSession] = useState(false)
  const [userFormObject, setUserFormObject] = useState(emptyFormObject)

  ///////////////////////////////////////////
  /////////        Context
  ///////////////////////////////////////////

  const {  setDogs } = useContext(DogContext)
  const { setCurrentUser } = useContext(AuthContext)

  const isLoginState=() => {
    setLogIn(() => !logIn)
  }

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
          setDogs(user.dogs)
          setSession(!session)
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

  if (session === false){

    return (
        <div>
          <div className="ui center aligned huge header" style={{margin:40}}>Welcome to SmartPark!</div>
          <div className="new-user-form">
            <div className="ui sizer vertical segment">
              <h2 className="ui center aligned large header" >
                {logIn ? "Login Here" : "Create A New Account"}
              </h2>
          </div>

        
                <Form className="ui form" onSubmit={handleSubmit}>
                  <div className='field'>
                    <Input 
                      label={{ icon: 'users' }}
                      labelPosition='left corner'
                      placeholder="username"                    
                      onChange={handleFormInputChange} 
                      type="text" 
                      name="username" 
                      value = {userFormObject.username} 
                    />
                  </div>
                  <div className='field'>
                    <Input
                      label={{ icon: 'asterisk' }}
                      labelPosition='left corner'
                      placeholder="password"  
                      onChange={handleFormInputChange}
                      type="password" 
                      name="password"
                      value = {userFormObject.password} 
                    />
                  </div>
                {logIn ?
                  null :
                  <div className='field'>
                    <Input
                      label = {{icon: 'image'}}
                      labelPosition='left corner'
                      placeholder="profile photo URL" 
                      onChange={handleFormInputChange} 
                      type="text" 
                      name="image"
                      value = {userFormObject.image} 
                    />
                  </div>
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
                      onClick={isLoginState} 
                      className='ui button'
                    >
                      {logIn ? "Don't have an account? Create one!" : "Return to Login"}
                    </button>
                </div>
            </div>
      </div>
    );
  }

  return (
    <main>
        <Route path="/">
            <Main />
        </Route>
    </main>
  )
}

export default Logging;
import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import Main from "../Main"

function LogIn({handleSignupClick}) {

  const emptyFormObject = {
    username:"",
    password:""
  }

  const [session, setSession] = useState(false)
  const [userFormObject, setUserFormObject] = useState(emptyFormObject)
  const [currentUser, setCurrentUser] = useState(null)
  const [dogs, setDogs] = useState(null)

  const mainPropsObj = {
    dogs: dogs,
    setDogs: setDogs,
    currentUser : currentUser,
    setCurrentUser: setCurrentUser,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://127.0.0.1:5555/login", {
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

  const setSignupState = (e) => {
    handleSignupClick(e)
  }


  if (session === false){

    return (
        <div>
          <div className="ui center aligned huge header" style={{margin:40}}>Welcome to SmartPark!</div>
          <div className="new-user-form">
            <div className="ui sizer vertical segment">
              <h2 className="ui center aligned large header" >Login Here</h2>
          </div>
                <form className="ui form" onSubmit={handleSubmit}>
                  <div className='field'>
                    <input 
                      onChange={handleFormInputChange} 
                      type="text" 
                      name="username" 
                      placeholder="username"
                      value = {userFormObject.username} 
                    />
                  </div>
                  <div className='field'>
                    <input 
                      onChange={handleFormInputChange} 
                      type="password" 
                      name="password" 
                      placeholder="password"
                      value = {userFormObject.password} 
                    />
                  </div>
                <button className='fluid ui button' type="submit">Submit</button>
                </form>
                <div className='ui basic buttons'>
                    <button 
                      onClick={setSignupState} 
                      className='ui button'
                    >
                      Don't have an accout? Create one!
                    </button>
                </div>
            </div>
      </div>
    );
  }

    return (
      <main>
          <Route path="/">
              <Main {...mainPropsObj} />
          </Route>
      </main>
    )
}

export default LogIn;
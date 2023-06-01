import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import Main from "../Main"

const sessionUser = []


function LogIn({handleSignupClick}) {

    const [session, setSession] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (session === false){
    
      const newUser = {
        username: username,
        password: password,
      }

      sessionUser.push(newUser)

      
      const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newUser)
        })
          .then(r => {
              if (r.status === 200){
              r.json()
              setSession(!session)
              } else {
              console.log('failure')
              }
        })
          e.target.reset()
      }
    
      const setSignupState = (e) => {
        handleSignupClick(e)
      }

      return (
          <div>
            <div class="ui center aligned huge header" style={{margin:40}}>Welcome to SmartPark!</div>
            <div className="new-user-form">
              <div class="ui sizer vertical segment">
                <h2 class="ui center aligned large header" >Login Here</h2>
            </div>
                  <form class="ui form" onSubmit={handleSubmit}>
                    <div class='field'>
                      <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                    </div>
                    <div class='field'>
                      <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" />
                    </div>
                  <button class='fluid ui button' type="submit">Submit</button>
                  </form>
                  <div class='ui basic buttons'>
                      <button onClick={setSignupState} class='ui button'>Don't have an accout? Create one!</button>
                  </div>
              </div>
        </div>
      );
    }
    else{
        const currentUser = sessionUser.pop()
        return (
            <main>
                <Route path="/">
                    <Main currentUser={currentUser}/>
                </Route>
            </main>
        )
    }
}

export default LogIn;
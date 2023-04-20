import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import Main from "./Main"

function LogIn() {

    const [session, setSession] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (session === false){
    
    const user = {
      username: username,
      password: password,
    }

    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
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
  
    
    return (
        <div>
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
            </div>
      </div>
    );
    }
    else{
        return (
            <main>
                <Route path="/">
                    <Main/>
                </Route>
            </main>
        )
    }
}

export default LogIn;
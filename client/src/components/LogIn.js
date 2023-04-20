import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import Main from "./Main"

const sessionUser = []


function LogIn() {

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
  
    
    return (
        <div>
            <div className="new-user-form">
                <h2>Welcome back, Sign in here</h2>
                <form onSubmit={handleSubmit}>
                <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" />
                <button type="submit">Submit</button>
                </form>
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
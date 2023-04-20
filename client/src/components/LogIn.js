import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Route } from "react-router-dom";
import Main from "./Main"

function LogIn() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    let history = useHistory();
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
            history.push('/login')
            console.log('success')
            } else {
            history.push('/login')
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
                <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
                <button type="submit">Submit</button>
                </form>
            </div>
        <main>
            {/* <Route exact path="/login">
                <Main/>
            </Route> */}
        </main>
      </div>
    );
}

export default LogIn;
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


function SignUp({user}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    const users = {
      username: username,
      password: password,
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(users)
      })
      .then(r => {
        if (r.ok){
          r.json()
          .then( console.log('success'))
        } else {
          console.log('failure')
        }
      })
        e.target.reset()
    }
  
    
    return (
      <div className="new-user-form">
        <h2>Welcome back, Sign in here</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
          <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default SignUp;
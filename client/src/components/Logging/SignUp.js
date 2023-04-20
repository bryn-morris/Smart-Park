import React, {useState} from 'react'
import {useHistory, Route} from 'react-router-dom'
import Main from '../Main'


function SignUp() {

    const [session, setSession] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")

    if (session === false){
  
    const user = {
      username: username,
      password: password,
      image: image
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      })
      .then(r => {
        if (r.ok){
          r.json()
          .then( console.log('success'))
          setSession(!session)
        } else {
          console.log('failure')
        }
      })
        e.target.reset()
    }
    
  
    return (
      <div className="new-user-form">
        <h2>Sign up here</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
          <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
          <input onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="profile photo URL" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
    }
    else {
        return (
        <main>
            <Route path="/">
                <Main/>
            </Route>
        </main>
        )
    }
}

export default SignUp;
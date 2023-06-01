import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import Main from '../Main'


function SignUp({handleSignupClick}) {

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
    
    const setSignupState = (e) => {
        handleSignupClick(e)
    }
  
    return (
      <div>
      <div className="ui center aligned huge header" style={{margin:40}}>Welcome to SmartPark!</div>
      <div className="new-user-form">
        <div className="ui sizer vertical segment">
          <h2 className="ui center aligned large header" >Create a New Account</h2>
        </div>
        <form className='ui form' onSubmit={handleSubmit}>
          <div className='field'>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
          </div>
          <div className='field'>
            <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
          </div>
          <div className='field'>
            <input onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="profile photo URL" />
          </div>
            <button className='fluid ui button' type="submit">Submit</button>
        </form>
        <div className='ui basic buttons'>
            <button className="ui button" onClick={setSignupState}>Return to Login</button>
        </div>
      </div>
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
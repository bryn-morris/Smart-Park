import React, {useState} from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'

function App() {
    const [signUp, setSignUp] = useState(false)
    const [login, setLogin] = useState(false)
  
    const handleSignupClick=() =>{
        setSignUp(!signUp)
    }
    const handleLoginClick=() =>{
      setLogin(!login)
  }
  return (
    <div>
      <h1>Welcome to SmartPark!</h1>
      
        {signUp ? (
          <div>
            <SignUp/>
            <button onClick={handleSignupClick}>Hide Signup</button>
          </div>
        ):(
          <button onClick={handleSignupClick}>Create Account</button>
        )}

        {login ?(
          <div>
            <LogIn/>
            <button onClick={handleLoginClick}>Hide LogIn</button>
          </div>
        ):(
          <button onClick={handleLoginClick}>Login</button>
        )}

    </div>
  )
}

export default App
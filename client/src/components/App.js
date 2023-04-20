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

    const handleHideSignup=()=>{

    }

  return (

    <div>
      {
        login ? (
          <div>
            <LogIn/>
            <div class='ui basic buttons'>
              <button class='ui button' onClick={handleLoginClick}>Hide LogIn</button>
            </div>
          </div>
        ):(
          <div>
            <button class="massive fluid ui button" onClick={handleLoginClick}>Login</button>
              <div class="ui sizer vertical segment">
                <div class="ui center aligned huge header">Welcome to SmartPark!</div>
              </div>
              {signUp ? (
                  <div>
                    <SignUp/>
                    <div class='ui basic buttons'>
                      <button class="ui button" onClick={handleSignupClick}>Hide Signup</button>
                    </div>
                  </div>
                ):(
                  <button class="massive fluid ui button" onClick={handleSignupClick}>Create Account</button>
                )}
          </div>
        )}
    </div>
  )
}

export default App
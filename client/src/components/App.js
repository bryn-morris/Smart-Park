import React, {useState} from 'react'
import SignUp from './Logging/SignUp'
import LogIn from './Logging/LogIn'

function App() {
    const [signUp, setSignUp] = useState(false)
    // const [login, setLogin] = useState(false)
    
  
    const handleSignupClick=() =>{
        setSignUp(!signUp)
    }
    // const handleLoginClick=() =>{
    //   setLogin(!login)
    // }


  return (

    <div>

      
      
          {signUp ? (
                  <div>
                    <SignUp handleSignupClick = {handleSignupClick}/>
                  </div>
                ):(
                  <div>
                    <LogIn handleSignupClick = {handleSignupClick}/>
                  </div>
                )} 
    </div>
  )}
      /* {/* {
        login ? (
          <div>
            
            <div class='ui basic buttons'>
              <button class='ui button' onClick={handleLoginClick}>Hide LogIn</button>
            </div>
          </div>
        ):(
          <div>
            <button class="massive fluid ui button" onClick={handleLoginClick}>Login</button>
              <div class="ui sizer vertical segment">
                
              </div>
              
          </div>
        )}
    </div>
  )
} */

export default App
import { useState } from "react"
import { Form, Icon } from "semantic-ui-react"

function LoginPage ({
    logIn,
    handleSubmit,
    createLoggingInput,
    userFormObject,
    setLogIn,
}) {

    const [isPasswordVisible, setIsPasswordVisible] =useState(false)

    return(
        <div>
        <div 
          className="ui center aligned huge header" 
          style={{margin:40}}
        >
          Welcome to SmartPark!
        </div>
        <div className="new-user-form">
          <div className="ui sizer vertical segment">
            <h2 className="ui center aligned large header" >
              {logIn ? "Login Here" : "Create A New Account"}
            </h2>
          </div>
            <Form className="ui form" onSubmit={handleSubmit}>
              {createLoggingInput({ icon: 'users' }, "username","text", userFormObject.username)}
              {createLoggingInput(
                { icon: 'asterisk' },
                "password",
                isPasswordVisible ? "text" : "password", 
                userFormObject.password,
                <Icon 
                  name = 'eye' 
                  size='large' 
                  onClick = {()=>setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            {logIn ? <div></div> : createLoggingInput({icon: 'image'}, "profile photo URL",
                "text", userFormObject.image)
            } 
              <button 
                className='fluid ui button' 
                type="submit"
              >
                Submit
              </button>
            </Form>
            <div className='ui basic buttons'>
                <button 
                  onClick={()=>{setLogIn(!logIn)}} 
                  className='ui button'
                >
                  {logIn ? "Don't have an account? Create one!" : "Return to Login"}
                </button>
            </div>
        </div>
      </div>
    )
}

export default LoginPage
import { useState } from "react"
import { Form, Input, Icon } from "semantic-ui-react"
import { handleFormInputChange } from "../helpers/helperFunctions"

function LoginPage ({
    logIn,
    handleSubmit,
    setLogIn,
}) {

    const emptyFormObject = logIn ?
        { username:"", password:""}:
        { username:"", password:"", image:"",}

    const [isPasswordVisible, setIsPasswordVisible] =useState(false)
    const [userFormObject, setUserFormObject] = useState(emptyFormObject)

    const createLoggingInput = (label, placeholder, type, value, children) => {

        return(
          <div className='field'>
            <Input
              label = {label}
              labelPosition='left corner'
              placeholder = {placeholder}
              onChange = {handleFormInputChange(userFormObject,setUserFormObject)}
              type = {type}
              name = {placeholder}
              value = {value}
            />
            {children}
          </div>
        )
    }

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
            <Form className="ui form" onSubmit={(e)=>handleSubmit(e, userFormObject, setUserFormObject, emptyFormObject )}>
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
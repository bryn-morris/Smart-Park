import { useState, useContext } from "react"
import { Form, Input, Icon } from "semantic-ui-react"
import { handleFormInputChange } from "../helpers/inputChangeHelper"
import { DogContext } from '../../context/DogContext';
import { WebSocketContext } from '../../context/WebSocketContext';
import fetchData from '../../utils/fetch_util';
import { AuthContext } from "../../context/AuthContext";

function LoginPage () {

    const [logIn, setLogIn] = useState(true)
  
    const { setDogs } = useContext(DogContext)
    const { friendSocket, setFriendSocket } = useContext(WebSocketContext)
    const {setCurrentUser, setIsReLogOpen} = useContext(AuthContext)

    // const history = useHistory()

    const emptyFormObject = logIn ?
        { username:"", password:""}:
        { username:"", password:"", image:"",}

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
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

    const handleSubmit = (e, userFormObject, setUserFormObject, emptyFormObject) => {

        e.preventDefault()
    
        const authConfigObj = {
          method: "POST",
          credentials: 'include',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(userFormObject)
        }
    
        // Authentication Fetch
        fetchData(`/${logIn ? 'login' : 'signup' }`,
          setIsReLogOpen,
          authConfigObj,
        )
        .then(bundle=>{
            try{
                setCurrentUser(bundle.userData);
                setDogs(bundle.userData.dogs);
                setFriendSocket(bundle.socketInstance);
            } catch (error) {
                // Auth Error 
                console.error(error);
                setIsReLogOpen(prev => !prev)
                
                setCurrentUser(null);
                setDogs(null);
                if (friendSocket){
                    friendSocket.disconnect()
                }   
            }
        })
        setUserFormObject(emptyFormObject)
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
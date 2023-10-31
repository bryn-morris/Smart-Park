import { Icon, Popup } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext, } from "react"
import { capitalizeInputHelper } from "../helpers/capitalizeInputHelper"


function LogOutIcon () {

    const {currentUser, setIsLogOutModalRendered} = useContext(AuthContext)

    return(
        <Popup 
            content = {`Navigate to ${capitalizeInputHelper('logout')}`}
            position = 'bottom center'
            on='hover'
            trigger = {
                <div
                    className="iconContainer"
                    onClick = {()=>setIsLogOutModalRendered(true)}
                >
                    <Icon
                        inverted
                        className="navIcon"
                        size = "large"
                        loading = {currentUser ? false : true}
                        name = {currentUser ? 'logout' : "spinner"}
                    />
                </div>
            }
        />
    )
}

export default LogOutIcon
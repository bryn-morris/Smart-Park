import { Icon, Popup } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { capitalizeInputHelper } from "../helpers/capitalizeInputHelper"


function MenuIcon ({labelIconString, listCount}) {

    const {currentUser} = useContext(AuthContext)

    return(
        <Popup 
            content = {`Navigate to ${capitalizeInputHelper(labelIconString)}`}
            position = 'bottom center'
            trigger = {
                <div 
                    className="iconContainer"
                    style={{flex: 100/listCount}}
                >
                    <Icon
                        inverted
                        className="navIcon"
                        size = "large"
                        loading = {currentUser ? false : true}
                        name = {currentUser ? labelIconString : "spinner"}
                    />
                </div>
            }
        />
    )
}

export default MenuIcon
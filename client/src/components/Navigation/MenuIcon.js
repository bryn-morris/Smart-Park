import { Icon } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"


function MenuIcon ({labelIconString, listCount}) {

    const {currentUser} = useContext(AuthContext)

    return(
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
        
    )
}

export default MenuIcon
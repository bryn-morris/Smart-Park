import { Icon, Popup } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { capitalizeInputHelper } from "../helpers/capitalizeInputHelper"


function MenuIcon ({labelIconString, listCount, onClickFunction}) {

    const {currentUser} = useContext(AuthContext)

    let tooltipContent;

    switch (labelIconString) {
        case ('logout'): {
            tooltipContent = capitalizeInputHelper(labelIconString)
            break;
        }
        case ('paw'):{
            tooltipContent = "CheckOut!"
            break;
        }
        default:
            tooltipContent = 'No Label Found!'
    }

    return(
        <Popup 
            content = {tooltipContent}
            position = 'bottom center'
            on='hover'
            trigger = {
                <div 
                    className="iconContainer"
                    style={{flex: 100/listCount}}
                    onClick = {onClickFunction}
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
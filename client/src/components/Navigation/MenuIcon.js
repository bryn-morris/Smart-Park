import { Icon, Popup } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { capitalizeInputHelper } from "../helpers/capitalizeInputHelper"
import NavIconStatus from "./NavIconStatus"
import { CheckInContext } from "../../context/CheckInContext"

function MenuIcon ({labelIconString, listCount, onClickFunction}) {

    const {currentUser} = useContext(AuthContext)
    const {checkInID} = useContext(CheckInContext)

    let tooltipContent;

    switch (labelIconString) {
        case ('log out'): {
            tooltipContent = capitalizeInputHelper(labelIconString)
            break;
        }
        case ('paw'):{

            tooltipContent = checkInID ?
                "Let's Check Out!" :
                "Let's Check In!"
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
                        loading = {currentUser ? false : true}
                        name = {labelIconString }
                    >
                        {labelIconString === 'paw' ?
                        <NavIconStatus/> :
                        null}
                    </Icon>
                    
                </div>
            }
        />
    )
}

export default MenuIcon
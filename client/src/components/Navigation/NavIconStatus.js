import { Icon } from "semantic-ui-react"
import { useContext } from "react"
import { CheckInContext } from "../../context/CheckInContext"

function NavIconStatus () {

    const {currentCheckInID} = useContext(CheckInContext)

    const color_value = currentCheckInID ? "#CE4027" : "green"

    return(
        <Icon
            style = {{color: color_value}}
            className = "navIconStatus"
            name = {
                currentCheckInID ?
                "times circle outline" :
                "check circle outline"
            }
        />
    )
}

export default NavIconStatus
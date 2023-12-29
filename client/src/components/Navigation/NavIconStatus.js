import { Icon } from "semantic-ui-react"
import { useContext } from "react"
import { CheckInContext } from "../../context/CheckInContext"

function NavIconStatus () {

    const {checkInID} = useContext(CheckInContext)

    const color_value = checkInID ? "#CE4027" : "green"

    return(
        <Icon
            style = {{color: color_value}}
            className = "navIconStatus"
            name = {
                checkInID ?
                "times circle outline" :
                "check circle outline"
            }
        />
    )
}

export default NavIconStatus
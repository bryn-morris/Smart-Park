import { Icon } from "semantic-ui-react"
import { useContext } from "react"
import { CheckInContext } from "../../context/CheckInContext"

function NavIconStatus () {

    const {currentCheckInID} = useContext(CheckInContext)

    return(
        <Icon
            inverted
            className = "navIconStatus"
            size = "tiny"
            name = {
                currentCheckInID ?
                "times circle outline" :
                "check circle outline"
            }
        />
    )
}

export default NavIconStatus
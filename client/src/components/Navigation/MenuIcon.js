import { Icon } from "semantic-ui-react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"


function MenuIcon ({labelIconString}) {

    const {currentUser} = useContext(AuthContext)

    return(
        <Icon
            bordered
            loading = {currentUser ? false : true}
            name = {currentUser ? labelIconString : "spinner"}
        />
    )
}

export default MenuIcon
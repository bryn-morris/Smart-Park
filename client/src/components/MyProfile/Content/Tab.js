import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
        <div>
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab" 
            >
                <div className="Label"/>{capitalizeInputHelper(tabLabel)}
                <div className = "pointyBit"/>
            </NavLink>
        </div>

    )
}

export default Tab
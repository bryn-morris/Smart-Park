import {NavLink} from "react-router-dom"
import NavDivider from "./NavDivider"

function MenuElement ({labelText, navRoute}) {

    const menuStyling = {
        marginRight: '2vh',
        marginLeft: '2vh',
    }

    return(
        <div>
            <NavLink 
                className="menuElement"
                exact = {labelText === 'Home' ? true : false}
                to = {navRoute}
                activeStyle = {{backgroundColor : "#D6D6D6"}}
            >
                <div className = "text">
                    {labelText}
                </div>
            </NavLink>
            <NavDivider 
                optionalStyling={labelText === 'Settings' ? '' : menuStyling}
            />
        </div>
        
    )
}

export default MenuElement
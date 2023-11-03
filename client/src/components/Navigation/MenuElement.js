import {NavLink} from "react-router-dom"

function MenuElement ({labelText, navRoute}) {

    return(
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
    )
}

export default MenuElement
import NavHead from "./NavHead"
import NavMenu from "./NavMenu"

import { useState } from 'react'

function NavContainer () {

    const [isActive, setIsActive] = useState(false)

    function toggleButton () {
        setIsActive(!isActive)
    }

    const menuStatePropsObject = {
        isActive: isActive, 
        toggleButton : toggleButton,
    }

    return (
        <div className = "nav Container">
            <NavHead {...menuStatePropsObject}/>
            <NavMenu {...menuStatePropsObject}/>
        </div>
    )
}

export default NavContainer
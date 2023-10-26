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

    const borderDivStyling = {
        height: '0.11vh',
        backgroundColor: '#E5E7E6',
    }

    return (
        <div className = "nav Container">
            <NavHead {...menuStatePropsObject}/>
            {isActive ?
            <div style = {borderDivStyling} />
            : null
            }
            <NavMenu {...menuStatePropsObject}/>
        </div>
    )
}

export default NavContainer
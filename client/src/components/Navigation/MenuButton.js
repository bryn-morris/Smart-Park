import { useState } from 'react'

function MenuButton () {

    const [isActive, setIsActive] = useState(false)

    function toggleButton () {
        setIsActive(!isActive)
    }

    return(
        <div className="menuButtonContainer">
            <div className = 'navButton' onClick={toggleButton}>
                <div className='icon-left'></div>
                <div className = 'icon-right'></div>
            </div>
        </div>
    )
}

export default MenuButton
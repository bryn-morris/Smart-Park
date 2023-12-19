import { Icon } from "semantic-ui-react"
import { useState } from "react";

function Title ({
    iconName, 
    title, 
    setSectionObject,
}) {
    
    const [isActive, setIsActive] = useState(title === "Favorite Parks")

    function handleExpandButtonClick () {
        setSectionObject((prevState)=>({
            ...prevState,
            [title]: !prevState[title]
        }))
        setIsActive((prevState)=>!prevState)
    }

    return(
        <div className="titleContainer">    
            <div className="title">
                <Icon 
                    name = {iconName}
                    className = "titleIcon"
                />
                {title}
            </div>
            <div 
                className = "expandIconContainer"
            >
                <div 
                    className={`containerButton ${isActive ? 'active' : ''}`}
                    onClick={handleExpandButtonClick}
                >
                    <div className='horizontalLine'/>
                    <div className='verticalLine'/>
                </div>
            </div>
        </div>
    )
}

export default Title
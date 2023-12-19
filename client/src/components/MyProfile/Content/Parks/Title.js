import { Icon } from "semantic-ui-react"

function Title ({iconName, title}) {
    return(
        <div className="titleContainer">    
            <div className="title">
                <Icon 
                    name = {iconName}
                    className = "titleIcon"
                />
                {title}
            </div>
        </div>
    )
}

export default Title
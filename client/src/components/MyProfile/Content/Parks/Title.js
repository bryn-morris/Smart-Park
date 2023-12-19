import { Icon } from "semantic-ui-react"

function Title ({
    iconName, 
    title, 
    sectionObject, 
    setSectionObject
}) {

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
                onClick={()=>{
                    setSectionObject((prevState)=>({
                        ...prevState,
                        [title]: !prevState[title]
                    }));
                }}
            >
                <Icon 
                    name = {sectionObject[title] ? "minus" : "plus"}
                    className = "expandIcon"
                />
            </div>
        </div>
    )
}

export default Title
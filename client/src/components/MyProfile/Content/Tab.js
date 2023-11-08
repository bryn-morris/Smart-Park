import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel, selectedTab, setSelectedTab}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab"
                activeStyle = {{backgroundColor : "#D6D6D6"}}
                onClick = {()=>setSelectedTab(tabLabel)} 
            >
                <div className="Label"/>{capitalizeInputHelper(tabLabel)}
                {
                    selectedTab === tabLabel ?
                    <div className="container">
                        <div className = "pointyBit"/>
                        <div className= "borderElement"/>
                    </div>
                    :
                    ""
                }
                
            </NavLink>
    )
}

export default Tab
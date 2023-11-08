import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel, selectedTab, setSelectedTab}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab"
                onClick = {()=>setSelectedTab(tabLabel)} 
            >
                <div className="Label"/>{capitalizeInputHelper(tabLabel)}
                {
                    selectedTab === tabLabel ?
                    <div className = "pointyBit"/>:
                    ""
                }
                
            </NavLink>
    )
}

export default Tab
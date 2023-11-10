import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import NavDivider from "../../Navigation/NavDivider"
import TabIcon from "./TabIcon";
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel, selectedTab, setSelectedTab}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
        <div 
            className="tabContainer"
        >
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab"
                onClick = {()=>setSelectedTab(tabLabel)} 
            >
                <div className="innerNav">
                    <TabIcon tabLabel = {tabLabel}/>
                    <div className="Label"/>{capitalizeInputHelper(tabLabel)} 
                </div>
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
            {tabLabel !== 'pets' ? <NavDivider optionalStyling = {{top:"100%", position:"absolute"}} /> : null}
        </div>
            
    )
}

export default Tab
import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import NavDivider from "../../Navigation/NavDivider"
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel, selectedTab, setSelectedTab}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
        <div className="tabContainer">
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab"
                activeStyle = {{backgroundColor : "#D6D6D6"}}
                onClick = {()=>setSelectedTab(tabLabel)} 
            >
                <div className="innerNav">
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
                </div>
                   
            </NavLink>
            {tabLabel !== 'pets' ? <NavDivider optionalStyling = {{top:"100%", position:"absolute"}} /> : null}
        </div>
            
    )
}

export default Tab
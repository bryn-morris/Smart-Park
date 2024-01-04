import { capitalizeInputHelper } from "../../helpers/capitalizeInputHelper"
import NavDivider from "../../Navigation/NavDivider"
import TabIcon from "./TabIcon";
import { NavLink } from "react-router-dom/"

function Tab ({tabLabel, selectedTab, setSelectedTab}) {

    const selectedTabIconStyling = {
        color: "#91972A",
        border: "2px #91972A solid",
    }

    return(
        <div className="tabContainer">
            <NavLink
                to = {`/profile/${tabLabel}`}
                className="Tab"
                onClick = {()=>setSelectedTab(tabLabel)} 
            >
                <div 
                    className="innerNav"
                    style={selectedTab === tabLabel ? selectedTabIconStyling : null} 
                >
                    <TabIcon 
                        tabLabel = {tabLabel}
                        optionalStyling={selectedTab === tabLabel ? {color: "#91972A"} : null}
                    />
                    <div 
                        className="text"
                        // style = {selectedTab === tabLabel ? {color: "#91972A"} : null}
                    >
                        {capitalizeInputHelper(tabLabel)}
                    </div>
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
            {tabLabel !== 'pets' ? <NavDivider optionalStyling = {{top:"100%", position:"absolute", backgroundColor: "#D6D6D6"}} /> : null}
        </div>
            
    )
}

export default Tab
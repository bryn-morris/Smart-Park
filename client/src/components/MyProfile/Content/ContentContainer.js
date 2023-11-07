import { useState } from "react"
import Tab from "./Tab"

function ContentContainer () {

    const tabList = ["Parks, Badges, Friends, Pets"]

    const [selectedTab, setSelectedTab] = useState("Parks")

    function renderTabs (tabLabels) {
        return tabLabels.map((eachLabel)=> {
            return(
                <Tab
                    key = {eachLabel}
                    tabLabel = {eachLabel}
                    setSelectedTab = {setSelectedTab}
                />
            )
        })
    }

    // use switch statement to render content within window based on selected tab

    return(
        <div className = "ContentContainer">
            <div className = "TabNav">
                {renderTabs(tabList)}
            </div>
            <div className= "Window"></div>
        </div>
    )
}

export default ContentContainer
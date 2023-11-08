import { useState } from "react"
import { Switch, Route } from 'react-router-dom/'
import Tab from "./Tab"
import ProfileBadges from "./Badges/ProfileBadges"
import ProfileFriends from "./Friends/ProfileFriends"
import ProfileParks from "./Parks/ProfileParks"
import ProfilePets from "./Pets/ProfilePets"

function ContentContainer () {

    const tabList = ["parks", "badges", "friends", "pets"]

    const [selectedTab, setSelectedTab] = useState(null)

    function renderTabs (tabLabels) {
        return tabLabels.map((eachLabel)=> {
            return(
                <Tab
                    key = {eachLabel}
                    tabLabel = {eachLabel}
                    selectedTab = {selectedTab}
                    setSelectedTab = {setSelectedTab}
                />
            )
        })
    }


    return(
        <div className = "ContentContainer">
            <div className = "TabNav">
                {renderTabs(tabList)}
            </div>
            <div className= "Window">
                <Switch>
                    <Route path = "/profile/parks">
                        <ProfileParks/>
                    </Route>
                    <Route path = "/profile/badges">
                        <ProfileBadges/>
                    </Route>
                    <Route path = "/profile/friends">
                        <ProfileFriends/>
                    </Route>
                    <Route path = "/profile/pets">
                        <ProfilePets/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default ContentContainer
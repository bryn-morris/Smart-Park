import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./MyProfile/Profile";
import { DogParkContext } from "../context/DogParkContext";
import { FriendsContext } from "../context/FriendsContext";
import fetchData from "../utils/fetch_util";
import { AuthContext } from "../context/AuthContext";
import Settings from "./Settings";
import { CheckInContext } from "../context/CheckInContext";
import SiteModals from "./SiteModals";

function Layout() {

  const { setDogParks } = useContext(DogParkContext)
  const { setFriendsList, setPendingFriendsList } = useContext(FriendsContext)
  const { setIsReLogOpen } = useContext(AuthContext) 
  const { setCurrentCheckInID } = useContext(CheckInContext)
  
  useEffect(()=>{

      fetchData('http://127.0.0.1:5555/dogparks', setIsReLogOpen)
        .then(data => setDogParks(data))

      fetchData('/friends', setIsReLogOpen)
        .then(friendsData => setFriendsList(friendsData))
      
      fetchData('/pending_friends', setIsReLogOpen)  
      .then(pendingFriendshipsData => setPendingFriendsList(pendingFriendshipsData))

      //use sessionStorage to check if currently checked in 
      const sessionCheckInID = sessionStorage.getItem('currentCheckInID')
      if (sessionCheckInID){
        setCurrentCheckInID(sessionCheckInID)
      }
    }, [
      setDogParks, 
      setFriendsList, 
      setPendingFriendsList, 
      setIsReLogOpen,
      setCurrentCheckInID
    ]
  )

  return (
    <div className='site'>
      <SiteModals/>
      {/* Switch */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/dogparks">
          <DogPark />
        </Route> */}
        <Route path="/profile">
          <Profile>
            {/* <Switch>
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
            </Switch> */}
          </Profile>
        </Route>
        {/* <Route path="/aboutus">
          <AboutUs/>
        </Route> */}
        <Route path="/settings">
          <Settings/>
        </Route>
      </Switch>
    </div>
  );
}



export default Layout;

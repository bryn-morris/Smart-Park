import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./MyProfile/Profile";
import { DogParkContext } from "../context/DogParkContext";
import { FriendsContext } from "../context/FriendsContext";
import fetchData from "../utils/fetch_util";
import { AuthContext } from "../context/AuthContext";
import Settings from "./Settings";
import SiteModals from "./SiteModals";
import NotFound from "./NotFound";
import {clearLocalStorageKey, addOrUpdateLocalStorageKey} from "../utils/localStorage_util";

function Layout() {

  const { setDogParks, setRecentParks } = useContext(DogParkContext)
  const { setFriendsList, setPendingFriendsList } = useContext(FriendsContext)
  const { setIsReLogOpen, authConfigObj } = useContext(AuthContext) 

  useEffect(()=>{

      const httpStatusHandlers = {
        202: ()=>clearLocalStorageKey('ciKey'),
      }

      if (
        !authConfigObj ||
        !authConfigObj.headers || 
        !authConfigObj.headers.Authorization
        ) {
          // Don't execute fetches if JWT key has not been assigned
          // This if statement is synchornous so should fire first
          return;
      }

      fetchData('http://127.0.0.1:5555/dogparks', setIsReLogOpen, {...authConfigObj})
        .then(data => setDogParks(data))

      fetchData('/friends', setIsReLogOpen, {...authConfigObj})
        .then(friendsData => setFriendsList(friendsData))
      
      fetchData('/pending_friends', setIsReLogOpen, {...authConfigObj})  
      .then(pendingFriendshipsData => setPendingFriendsList(pendingFriendshipsData))

      fetchData('/recent_parks', setIsReLogOpen, {...authConfigObj})
      .then(recentParksData => setRecentParks(recentParksData))

      fetchData('/check_in_status', setIsReLogOpen, {...authConfigObj}, httpStatusHandlers)
      .then(checkInData => {
        if (checkInData){
          addOrUpdateLocalStorageKey('ciKey', checkInData.check_in_ID)
        }
    })
    }, [
      setDogParks, 
      setFriendsList, 
      setPendingFriendsList, 
      setIsReLogOpen,
      setRecentParks,
      authConfigObj,
    ]
  )

  return (
    <div className='site'>
      <SiteModals/>
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/dogparks">
          <DogPark />
        </Route> */}
        <Route path="/profile">
          <Profile/>
        </Route>
        {/* <Route path="/aboutus">
          <AboutUs/>
        </Route> */}
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path = "*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}



export default Layout;

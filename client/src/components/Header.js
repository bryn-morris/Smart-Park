import React, {useContext} from 'react'
import {NavLink } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';

function Header() {

  const { currentUser, setCurrentUser } = useContext(AuthContext)

  function logOut() {
    // window.location.href = '/';
    fetch('/logout', {method:"DELETE",}).then(console.log("successfully logged out"))
    setCurrentUser(null)
  }

  const createMenuOption = (to,children, onClick, position, style) => {
    return(
      <Menu.Item
        as = {NavLink}
        to = {to}
        onClick = {onClick}
        position= {position}
        style = {style}
        exact
      >
        {children}
      </Menu.Item>
    )
  }

    return (
      <Menu className = 'navBar' inverted>
        {createMenuOption("/",<div>Home</div>)}
        {createMenuOption("/dogparks",<div>Dog Parks</div>)}
        {createMenuOption("/aboutus", "About Us")}
        {createMenuOption("/myaccount",
          <Image
            avatar
            bordered
            src = {currentUser.image} 
            alt= "User Profile"
            className = "profileButtonImage"
            />
          )}
        <Menu.Item>Hi There {currentUser.username}</Menu.Item>
        {createMenuOption("/logging", "Logout", logOut, 'right', {marginLeft: '5em'})}
      </Menu>
    );
  }
export default Header
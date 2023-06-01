import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react';

function Header({setCurrentUser}) {

  function logOut() {
    window.location.href = '/';
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
        {createMenuOption("/myaccount",<Icon name = 'user circle' size = 'large'/>)}
        {createMenuOption("/login", "Logout", logOut, 'right', {marginLeft: '5em'})}
      </Menu>
    );
  }
export default Header
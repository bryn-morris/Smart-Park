import React, {useContext} from 'react'
import {NavLink } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import { DogParkContext } from '../context/DogParkContext';

function Header() {

  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const { setDogParks } = useContext(DogParkContext)

  function logOut() {
    fetch('/logout', {method:"DELETE",}).then(console.log("successfully logged out"))
    setCurrentUser(null)
    setDogParks([])
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
      {createMenuOption("/logging", "Log Out", logOut, 'right', {marginLeft: '5em'})}
    </Menu>
  );
}

export default Header
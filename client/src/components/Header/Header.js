import React, {useContext, useState} from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { AuthContext } from '../../context/AuthContext';
import LogOutModal from './LogOutModal';

function Header() {

  const [isAvatarClicked, setIsAvatarClicked] = useState(false)
  const [isLogOutModalRendered, setIsLogOutModalRendered] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const history = useHistory()

  const myAccountRedirect = () => {
    setIsAvatarClicked(false)
    history.push("/myaccount")
  }

  const logOutModalRender = () => {
    setIsAvatarClicked(false)
    setIsLogOutModalRendered(true)
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
    <div>
      <Menu className = 'navBar' inverted>
        {createMenuOption("/",<div>Home</div>)}
        {createMenuOption("/dogparks",<div>Dog Parks</div>)}
        {createMenuOption("/aboutus", "About Us")}
        <Menu.Item>Hi There {currentUser.username}</Menu.Item>
        <Menu.Item onClick={()=>{setIsAvatarClicked(!isAvatarClicked)}}>
            <Image
              avatar
              bordered
              src = {currentUser.image} 
              alt= "User Profile"
              className = "profileButtonImage"
            />
            <Dropdown icon={null} open={isAvatarClicked}>
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={myAccountRedirect}
                >My Account</Dropdown.Item>
                <Dropdown.Item 
                  onClick={logOutModalRender}
                >Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        {/* {createMenuOption("/myaccount",
          <Image
            avatar
            bordered
            src = {currentUser.image} 
            alt= "User Profile"
            className = "profileButtonImage"
          />
          )} */}
      </Menu>
      <LogOutModal 
        isLogOutModalRendered = {isLogOutModalRendered}
        setIsLogOutModalRendered = {setIsLogOutModalRendered}
      />
    </div>
  );
}

export default Header
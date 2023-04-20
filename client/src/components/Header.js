import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react';

function Header() {

  function refreshPage() {
    window.location.reload(true);
  }

    return (
      <Menu className = 'navBar' inverted>
        <Menu.Item as={NavLink} to="/" exact>
          <div>Home</div>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/dogparks" exact>
          <div>Dog Parks</div>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/aboutus" exact>
          About Us
        </Menu.Item>
        <Menu.Item as={NavLink} to="/myaccount" exact>
          <Icon name = 'user circle' size = 'large'/>
        </Menu.Item>
        <Menu.Item 
          as={NavLink} 
          to="/login" 
          exact 
          onClick={refreshPage}
          position='right'
          style={{ marginLeft: '5em'}}
          >
            Logout
        </Menu.Item>
      </Menu>
    );
  }
export default Header
import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
      <nav>
        <div className="navigation">
          <NavLink to="/" exact>
            <div>Home</div>
          </NavLink>
          <NavLink
            to="/dogparks" exact>
            <div>Dog Parks</div>
          </NavLink>
          <NavLink
            to="/myaccount" exact>
            <div>My Account</div>
          </NavLink>
          <NavLink
          to="/aboutus" exact>
            <div>About Us</div>
          </NavLink>
        </div>
      </nav>
    );
  }
export default Header
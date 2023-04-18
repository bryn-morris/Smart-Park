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
            to="/checkin" exact>
            <div>Check In</div>
          </NavLink>
        </div>
      </nav>
    );
  }
export default Header
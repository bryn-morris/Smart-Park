import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {

  function refreshPage() {
    window.location.reload(true);
  }

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
          <NavLink
          to="/login" exact>
            <div>
              <button onClick={refreshPage}>Logout</button>
            </div>
          </NavLink>
        </div>
      </nav>
    );
  }
export default Header
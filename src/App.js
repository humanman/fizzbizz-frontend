import React from 'react';
import './css/App.css';
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/App.css'

function App(props) {
  const OnlyAuthLinks = VisibleOnlyAuth(() =>
    <span>
      <li className="pure-menu-item">
        <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
      </li>
      <li className="pure-menu-item">
        <Link to="/profile" className="pure-menu-link">Profile</Link>
      </li>
      <LogoutButtonContainer />
    </span>
  )

  const OnlyGuestLinks = HiddenOnlyAuth(() =>
    <span>
      <LoginButtonContainer isNav={true} />
    </span>
  )

  return (
    <div className="App">
      <nav className="navbar pure-menu pure-menu-horizontal">
        <Link to="/" className="pure-menu-heading pure-menu-link">FizzBizz Booking</Link>
        <ul className="pure-menu-list navbar-right">
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </ul>
      </nav>
      {props.children}
    </div>
  );
}

export default App;

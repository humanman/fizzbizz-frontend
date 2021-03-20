import React from 'react'

// Images
import web3Logo from '../../../img/logo_web3.png'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}><img className="uport-logo" src={web3Logo} alt="Web3 Logo" />Login with Web3</a>
    </li>
  )
}

export default LoginButton

import React from 'react'
// Images
import web3Logo from '../../img/logo_web3.png'

const LoginButton = ({ onLoginUserClick , isNav}) => {

  return(
    <>
    { isNav ? 
      <li className="pure-menu-item">
        <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}>
          Login with Web3
            <img className="uport-logo" src={web3Logo} alt="Web3 Logo" />
        </a>
      </li>
      :
      <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}>
        Login with Web3
        { isNav &&
          <img className="uport-logo" src={web3Logo} alt="Web3 Logo" />
        }
      </a>

    }
    </>
  )
}

export default LoginButton

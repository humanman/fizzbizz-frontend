import { web3Eth } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'
import axios from 'axios'
import '@metamask/legacy-web3'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL


const deFaultCompany = 'COKE'

function createIdentity(addr, company) {
  if (addr) {
    return axios.post(`${API_BASE_URL}/dev/api/v1/user/new`, {
      pubAddr: addr,
      company: company,
    }).then(res => res)
  }
}

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
    // company: "COKE"
    // email: "web3User"
    // nonce: "b6d8f8dcaxxxxxxxxxxxxxxxxxx"
    // pubAddr: "0xcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx8dee85b"
    // username: "web3User"
  }
}

function handleSignMessage(obj) {
  console.log('args',obj)
  let nonce = obj.nonce
  let pubAddr = obj.pubAddr
  return new Promise((resolve, reject) =>
    window.web3.personal.sign(
      window.web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      pubAddr,
      (err, signature) => {
        if (err) return reject(err);
        return resolve({ pubAddr, signature });
      }
    )
  );
};

function handleAuthenticate({ pubAddr, signature }) {

  return axios.post(`${ API_BASE_URL }/user/authenticate`, {
    pubAddr, 
    signature,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res);
}
  
export function loginUser() {
  // window.web3.personal.sign(web3.fromUtf8("Welcome to FizzBizz Booking!"), web3.eth.coinbase, console.log);  
  const pubAddr = window.web3.eth.coinbase.toLowerCase()
  return function(dispatch) {
    // check publicaddress
    return axios.get(`${API_BASE_URL}/dev/api/v1/user?pubAddr=${pubAddr}&company=${deFaultCompany}`)
      .then(res => {
        return (res.status == '200' ? res : createIdentity(pubAddr, deFaultCompany))
      })
      .then(user => {
        user = JSON.parse(JSON.stringify(user.data))
        dispatch(userLoggedIn(user))
        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        var currentLocation = browserHistory.getCurrentLocation()
        handleSignMessage(user)
        if ('redirect' in currentLocation.query) {
          return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }

        return browserHistory.push('/dashboard')
      })
      // .then(handleAuthenticate)
  }
}

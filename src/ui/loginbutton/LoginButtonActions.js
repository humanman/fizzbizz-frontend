import { browserHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import '@metamask/legacy-web3'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const env = process.env.REACT_APP_API_ENV


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
  let nonce = obj.nonce
  let pubAddr = obj.pubAddr
  return new Promise((resolve, reject) =>
    window.web3.personal.sign(
      window.web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      pubAddr,
      (err, signature) => {
        if (err) {
          // HANDLE ERROR GRACEFULLY
          // REDIRECT TO 404 page
          return reject(err);
        }
        return resolve({ pubAddr, signature });
      }
    )
  );
};

function handleAuthenticate({ pubAddr, signature }) {

  return axios.post(`${ API_BASE_URL }/${env}/user/authenticate`, {
    pubAddr, 
    signature,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res);
}
  
export function loginUser() {
  let loginData =  {}
  loginData.localDataUser = sessionStorage.getItem('fizzbizz-username')
  loginData.localDataCompany = sessionStorage.getItem('fizzbizz-companyname')
  try {
    const pubAddr = window.web3.eth.coinbase ? window.web3.eth.coinbase.toLowerCase() : window.ethereum.enable().then(() => window.web3.eth.coinbase.toLowerCase)
    return function (dispatch) {
      // check publicaddress
      return axios.get(`${API_BASE_URL}/${env}/api/v1/user?pubAddr=${pubAddr}&company=${deFaultCompany}`)
        .then(res => {
          return (res && res.status == '200' ? res : createIdentity(pubAddr, loginData.localDataCompany))
        })
        .then(user => {
          let userObj = JSON.parse(JSON.stringify(user.data))
          console.log(userObj)

          // TODO: REDIRECT TO 404 IF ANY ERRORS
          var currentLocation = browserHistory.getCurrentLocation()

          // console.log('userObj ', userObj)
          if (loginData.localDataCompany || loginData.localDataUser) {
            if (loginData.localDataUser && userObj.username == 'web3User') userObj.username = loginData.localDataUser
            if (loginData.localDataCompany) userObj.company = loginData.localDataCompany
          }

          dispatch(userLoggedIn(userObj))
          dispatch({ type: 'DASH_HIDE_DIALOG' })

          return browserHistory.push('/dashboard')
        })
      // .then(handleAuthenticate)
    }

  } 
  catch {
    window.alert("no ethereum wallet detected. For demo purposes you will be redirected to the dashboard as if you were a web3 user")

    return function (dispatch) {
    
      let userObj = {
        username: loginData.localDataUser,
        nonce: 'xxx',
        email: 'web3user',
        company: loginData.localDataCompany
      }
      dispatch(userLoggedIn(userObj))
      dispatch({ type: 'DASH_HIDE_DIALOG' })

      return browserHistory.push('/dashboard')
    }
  } 
  

  // window.web3.personal.sign(web3.fromUtf8("Welcome to FizzBizz Booking!"), web3.eth.coinbase, console.log); 

 

}

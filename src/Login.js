import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '@metamask/legacy-web3'
const API_BASE_URL = process.env.API_BASE_URL

function retreiveWeb3PubAddr(callback, addr, company) {
  if (addr) {
    return axios.get(`${API_BASE_URL}/dev/api/v1/user?pubAddr=${addr}&company=${company}`)
      .then(res => res)
      .then(
        users => (users.length ? users[0] : callback(addr, company))
      )
  } else {
    // prompt user to add web3 extension
    // display alt login method
  }
  return this
}

function dispatchWeb3PubAddr(addr, company) {
  if (addr) {
    return axios.post(`${API_BASE_URL}dev/api/v1/user/new`, {
      pubAddr: addr,
      company: company || 'COKE'
      // headers: {
      //   'Content-Type' : 'application/json'
      // }
    }).then(res => res)
  }
}

function Login() {
  const [company, setCompany] = useState('COKE')
  const [publicAddress, setPublicAddress] = useState(0)

  useEffect(() => {
    console.log('eth ', web3.eth.coinbase)
  })

  function createUserKey() {
    setPublicAddress(window.web3.eth.coinbase.toLowerCase())
    return retreiveWeb3PubAddr(dispatchWeb3PubAddr, publicAddress, setCompany(company))
  }

  return (
    <div>
      <button className="login-btn" onClick={createUserKey}>Login in with Blockchain</button>
    </div>
  )
}

export default Login
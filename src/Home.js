import React, { Component,  } from 'react'
import ConfirmModal from './ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import bookingsUtil from './util/api/bookingsUtil'
const getBookings = bookingsUtil.getBooking()
// UI Components
import LoginButtonContainer from './ui/loginbutton/LoginButtonContainer';


const Home = () => {

  const dispatch = useDispatch()  
  const isLoggedOut = useSelector(state => (state.user && state.user.data) ? false : true)

  const handleConfirm = (args) => {
    console.log('a ', args)
    dispatch(loginUser(args))
  }

  return(
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Welcome FizzBizz Booking!</h1>
          <h2>Web3 Authentication</h2>
          <h3>Click Logout to reset your NAME and COMPANY affiliation</h3>
          <p>NOTE: To interact with your smart contracts through web3 instance, make sure that your browser has <a href="https://metamask.io/" target="_blank">metamask extension</a> installed.</p>
          <p>In the upper-right corner, you'll see a login button. Click it to login with Web3. There is an authenticated route, "/dashboard", that displays the sovereign user's name once authenticated.</p>
        </div>
      </div>
      {isLoggedOut && 
        <ConfirmModal 
          username={true}
          companyname={true}
          message={"Welcome to FizzBizz Booking!"}
          isLoginPage={true}
          handleConfirm={args => handleConfirm(args)}
        >
          <LoginButtonContainer/>
        </ConfirmModal>
      }
    </main>
  )
}

export default Home

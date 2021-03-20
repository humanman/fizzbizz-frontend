import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome FizzBizz Booking!</h1>
            <h2>Web3 Authentication</h2>
            <p>NOTE: To interact with your smart contracts through web3 instance, make sure that your browser has <a href="https://metamask.io/" target="_blank">metamask extension</a> installed.</p>
            <p>In the upper-right corner, you'll see a login button. Click it to login with Web3. There is an authenticated route, "/dashboard", that displays the sovereign user's name once authenticated.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home

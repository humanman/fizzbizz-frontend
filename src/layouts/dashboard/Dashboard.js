import React, { Component } from 'react'
import '../../Grid.css';
import Grid from '../../Grid';
import BookingForm from '../../BookingForm';


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with Web3 successfully.</p>
          </div>
        </div>
        <Grid/>
        <BookingForm/>
      </main>
    )
  }
}

export default Dashboard

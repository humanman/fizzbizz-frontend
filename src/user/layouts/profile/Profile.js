import React, { useState, useEffect } from 'react'

function Profile (props){

  const [authData, setAuthData] = useState(...props)

  useEffect(()=> {
    setAuthData(props)
  })
  
  return (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Profile</h1>
          <p>Change these details in UPort to see them reflected here.</p>
          <p>
            <strong>Name</strong><br />
            {authData.name}
          </p>
        </div>
      </div>
    </main>
  )
}

export default Profile

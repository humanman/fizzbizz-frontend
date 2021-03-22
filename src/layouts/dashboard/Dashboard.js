import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../Grid';
// import BookingForm from '../../BookingForm';
import ConfirmModal from '../../ConfirmationModal';




function Dashboard (props) {

  const [value, setValue] = useState("");
  const [btnCopy, setbtnCopy] = useState("Create New Booking");

  const authData = useSelector(state => state.user.data)
  const dialog = useSelector(state => state.dialog)


  const handleSubmit = () => {
    setbtnCopy("")
    setValue("confirming");
  };

  const dispatch = useDispatch()

  return (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Dashboard - {authData.company}</h1>
          <p><strong>Congratulations {authData.username}!</strong> If you're seeing this page, you've logged in with Web3 successfully.</p>
        </div>
      </div>
      <ConfirmModal
        title="Confirm"
        description="Are you sure?"
        callbackFunction={handleSubmit}
      >
        {confirm => (
          <div>
            <p>
              {value}
            </p>
            {
              <button className="confirm-btn pure-menu-item" type="button" onClick={confirm(handleSubmit)}>
                {btnCopy}
              </button>
            }
          </div>
        )}
      </ConfirmModal>
      <Grid />
    </main>
  )
  
}

export default Dashboard

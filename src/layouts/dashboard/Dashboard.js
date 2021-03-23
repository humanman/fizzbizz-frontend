import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../Grid';
// import BookingForm from '../../BookingForm';
// import ConfirmModal from '../../ConfirmationModal';
import '../../ConfirmationModal.css';
import ConfirmationModal from '../../ConfirmationModal';


function Dashboard (props) {

  const [value, setValue] = useState("");
  const [btnCopy, setbtnCopy] = useState("Create New Booking");

  const authData = useSelector(state => state.user.data)
  const confirm = useSelector(state => state.dialog.confirm)
  const metaDataObj = useSelector(state => state.booking.metaData)
  // const availability = useSelector(state => state.status)
  const currentSelection = useSelector(state => state.booking.currentSelection)
  const dispatch = useDispatch()
  // const [open, setOpen] = useState(false);
  // const [username, setUserName] = useState('')
  // const [meetingname, setMeetingName] = useState('')
  // const [company, setCompany] = useState('')
  const [prompt, setPrompt] = useState('Confirm Booking')


  // const onCloseModal = () => {
  //   dispatch({ type: 'DASH_HIDE_DIALOG' })
  //   setOpen(false);
  // }

  // const onOpenModal = () => {
  //   dispatch({ type: 'DASH_SHOW_DIALOG' })
  //   setOpen(true);
  // }

  // const handleSubmit = (e) => {
  //   (e).stopPropagation()
  //   setbtnCopy("Create New Booking")
  //   setValue("confirming");
  // };

  const handleConfirm = () => {
    setbtnCopy("Create New Booking")
    setValue("confirming");
    let title = window.sessionStorage.getItem('fizzbizz-meetingname')
    let user = window.sessionStorage.getItem('fizzbizz-username')
    let booking= 'booking' + Math.floor(Math.random() * 10 + 1 )
    // I don't think this fn actually works. 
    let pendingBookings = currentSelection.map(slot => {
      return Object.assign({}, slot, { bookingtitle: title, organizer: user, booking} )
    })
  
    dispatch({ type: 'STATUS_HOLD', slots: pendingBookings , metadata:{title, user, booking }})
    dispatch({ type: 'DASH_HIDE_DIALOG' })
  };

  const handleCancel = () => {
    setbtnCopy("Create New Booking")
    setValue("canceling");
    dispatch({ type: 'STATUS_UNBOOKED', slots: currentSelection })
    dispatch({ type: 'DASH_HIDE_DIALOG' })
  };

  return (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Dashboard - {authData.company}</h1>
          <p><strong>Congratulations {authData.username}!</strong> If you're seeing this page, you've logged in with Web3 successfully.</p>
        </div>
      </div>
      {confirm && 
        <ConfirmationModal
          meetingname={true}
          message={prompt}
          onConfirm={(args) => handleConfirm(args)}
          onCancel={() => handleCancel()}
          isLogin={false}
        />
      }
      {!confirm && 
        <Grid />
      }
    </main>
  )
  
}

export default Dashboard

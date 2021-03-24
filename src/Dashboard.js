import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from './Grid';
// import BookingForm from '../../BookingForm';
// import ConfirmModal from '../../ConfirmationModal';
// import '../../ConfirmationModal.css';
import ConfirmationModal from './ConfirmationModal';
import bookingsUtil from './util/api/bookingsUtil'
const getBookings = bookingsUtil.getBooking()
const addBookings = bookingsUtil.addBooking()
const updateBookings = bookingsUtil.updateBooking()

function Dashboard (props) {

  const [value, setValue] = useState("");
  const [btnCopy, setbtnCopy] = useState("Create New Booking");

  const authData = useSelector(state => state.user.data)
  const confirm = useSelector(state => state.dialog.confirm)
  const metaDataObj = useSelector(state => state.booking.metaData)
  const currentSelection = useSelector(state => state.booking.currentSelection)
  const dispatch = useDispatch()
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
  const user = window.sessionStorage.getItem('fizzbizz-username')
  const company = window.sessionStorage.getItem('fizzbizz-companyname')

  useEffect(() => {
    getBookings({company, booking_id:null}).then((statusArr) => {
      console.log(statusArr)
      if (statusArr) {
        for (let status of statusArr) {
          dispatch(status)
        }
      }
    })
  })

  const handleConfirm = () => {
    setbtnCopy("Create New Booking")
    setValue("confirming");
    let title = window.sessionStorage.getItem('fizzbizz-meetingname')
    // let user = window.sessionStorage.getItem('fizzbizz-username')
    // let company = window.sessionStorage.getItem('fizzbizz-companyname')

    // get/create starttime
    // get/create endtime
    let booking = company
    let start = currentSelection[0].time
    let end = currentSelection[currentSelection.length-1].time
    let roomChar = booking.charAt(0)
    let roomName = roomChar + (currentSelection[0] < 10 ? 0 : "")
    // bookingid will be concactenation of company and datalookups of first to last 
    let pendingBookings = currentSelection.map(slot => {
      booking += '|' + slot.id
    
      return Object.assign({}, slot, { bookingtitle: title, organizer: user, booking} )
    })

    dispatch({ type: 'STATUS_HOLD', slots: pendingBookings , metadata:{title, user, booking, start, end }})
    dispatch({ type: 'DASH_HIDE_DIALOG' })
    setTimeout(() => {
      addBookings({ 
        booking_id: booking,
        company: company,
        booking_name: title,
        room_id: roomName,
        organizer_id: user,
        start_time: start,
        end_time: end
      }).then((statusArr) => {
        console.log(statusArr)
        if (statusArr) {
          for (let status of statusArr) {
            dispatch(status)
          }
        }
      })
    })
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

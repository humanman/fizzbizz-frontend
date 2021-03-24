import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from './Grid';
import './css/Dashboard.css'
import ConfirmationModal from './ConfirmationModal';
import bookingsUtil from './util/api/bookingsUtil'
const getBookings = bookingsUtil.getBooking()
const addBookings = bookingsUtil.addBooking()
const updateBookings = bookingsUtil.updateBooking()
const deleteBookings = bookingsUtil.deleteBooking()

function Dashboard (props) {

  const [value, setValue] = useState("");
  const [btnCopy, setbtnCopy] = useState("Create New Booking");

  const authData = useSelector(state => state.user.data)
  const selectedBooking = useSelector(state => state.dialog.bookingId)
  const confirm = useSelector(state => state.dialog.confirm)
  const edit = useSelector(state => state.dialog.edit)
  const metaDataObj = useSelector(state => state.booking.metaData)
  const currentSelection = useSelector(state => state.booking.currentSelection)
  const dispatch = useDispatch()
  const [prompt, setPrompt] = useState('Confirm Booking')


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
    let booking = company
    let start = currentSelection[0].time
    let end = currentSelection[currentSelection.length-1].time
    let roomChar = booking.charAt(0)
    let roomName = roomChar + (currentSelection[0].col < 10 ? 0 : "")
    console.log(roomName)
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
        room_id: String(currentSelection[0].col),
        organizer_id: user,
        start_time: start,
        end_time: end
      }).then((statusArr) => {
        console.log(statusArr)
      })
    })
  };

  const handleCancel = () => {
    setbtnCopy("Cancel Booking?")
    setValue("canceling");
    dispatch({ type: 'STATUS_UNBOOKED', slots: currentSelection })
    dispatch({ type: 'DASH_HIDE_DIALOG' })
  };

  const handleCancelEdit = () => {

    dispatch({ type: 'DASH_DESELECT_BOOKING' })
  };

  const handleDeleteBooking = (args) => {
 
    deleteBookings({ "company": company, "booking_id": selectedBooking}).then(() => {

      dispatch({ type: 'STATUS_UNBOOKED', slots: currentSelection })
  
      dispatch({ type: 'DASH_DELETE_BOOKING' })
    })
  };

  return (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Dashboard - {authData.company}</h1>
          <p><strong>Congratulations {authData.username}!</strong> If you're seeing this page, you've logged in with Web3 successfully.</p>
        </div>
      </div>
      {confirm && !edit &&
        <ConfirmationModal
          meetingname={true}
          message={prompt}
          onConfirm={(args) => handleConfirm(args)}
          onCancel={() => handleCancel()}
          isLogin={false}
        />
      }
      {confirm && edit &&
        <ConfirmationModal
          message={"Delete Booking?"}
          onConfirm={(args) => handleDeleteBooking(args)}
          onCancel={() => handleCancelEdit()}
          isLogin={false}
        />
      }
      {!confirm && 
        <Grid />
      }
      <div className="colors">
        <div className="color-type blocked">
          <p>BLOCKED</p>
          <div></div>
        </div>
        <div className="color-type pending">
          <p>PENDING</p>
          <div></div>
        </div>
        <div className="color-type editable">
          <p>EDITABLE</p>
          <div></div>
        </div>
      </div>
    </main>
  )
  
}

export default Dashboard

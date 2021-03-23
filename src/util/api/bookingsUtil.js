
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const env = process.env.REACT_APP_API_ENV


addBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking`
  // try/catch block validates user is logged in (pubAddress), and data is valid
  // user must be the one on who booked as well!
  // TODO: convert to axios interceptor to preprocess request
  try {
    axios.post(url, {
        booking_id: req.booking,
        booking_name: req.organizer, // pubAddress
        company : req.company,
        room_id: req.roomId,
        start_time: req.startTime,
        end_time: req.endTime
      })
      .then(response => {
        // should be a fetch all response to update current bookings
        // possibly need to transform into something status can use
        // also - add status reducer to bookingReducer
        dispatch({ type: 'BOOKING_CREATE', payload: response.data });
      })

  } catch {
    // preflight error // 'user address not found'
  }
}

getBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking`
  // try/catch block validates user is logged in (pubAddress), and data is valid
  // TODO: convert to axios interceptor to preprocess request
  try {
    axios.get(url, {
      params: {
        booking_id: req.booking_id
      }})
      .then(response => {
        // should be a fetch all response to update current bookings
        // possibly need to transform into something status can use
        // also - add status reducer to bookingReducer
        dispatch({ type: 'BOOKING_GET', payload: response.data });
      })

  } catch {
    // preflight error // 'user address not found'
  }
}

updateBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking`
  // try/catch block validates user is logged in (pubAddress), and data is valid
  // user must be the one on who booked as well!
  // TODO: convert to axios interceptor to preprocess request
  // will delete old booking and create new booking
  // TODO: address issue of latency between deleting and creating new booking
  try {
    axios.put(url, {
        old_booking_id: req.bookingOld,
        booking_id: req.bookingNew,
        booking_name: req.organizer, // pubAddress
        company: req.company,
        room_id: req.roomId,
        start_time: req.startTime,
        end_time: req.endTime
      })
      .then(response => {
        // should be a fetch all response to update current bookings
        // possibly need to transform into something status can use
        // also - add status reducer to bookingReducer
        dispatch({ type: 'BOOKING_UPDATE', payload: response.data });
      })

  } catch {
    // preflight error // 'user address not found'
  }
}

deleteBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking/${booking_id}`
  // try/catch block validates user is logged in (pubAddress)
  // user must be the one on who booked as well!
  // TODO: convert to axios interceptor to preprocess request
  // will delete old booking and create new booking
  // TODO: address issue of latency between deleting and creating new booking
  try {
    axios.delete(url)
      .then(response => {
        // should be a fetch all response to update current bookings
        // possibly need to transform into something status can use
        // also - add status reducer to bookingReducer
        dispatch({ type: 'BOOKING_DELETE', payload: response.data });
      })

  } catch {
    // preflight error // 'user address not found'
  }
}


export const bookingsUtils = {
  addBooking,
  getBooking,
  updateBooking,
  deleteBooking
}

return axios.get(`${API_BASE_URL}/dev/api/v1/user?pubAddr=${pubAddr}&company=${deFaultCompany}`)
  .then(res => {
    return (res.status == '200' ? res : createIdentity(pubAddr, deFaultCompany))
  })
  .then(user => {
    user = JSON.parse(JSON.stringify(user.data))
    if (loginData.localDataCompany || loginData.localDataUser) {
      if (loginData.localDataUser && user.username == 'web3User') user.username = loginData.localDataUser
      if (loginData.localDataCompany) user.company = loginData.localDataCompany
    }

    dispatch(userLoggedIn(user))
    dispatch({ type: 'DASH_HIDE_DIALOG' })

    // Used a manual redirect here as opposed to a wrapper.
    // This way, once logged in a user can still access the home page.
    var currentLocation = browserHistory.getCurrentLocation()
    handleSignMessage(user)
    if ('redirect' in currentLocation.query) {
      return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }

    return browserHistory.push('/dashboard')
  })
      // .then(handleAuthenticate)

export const bookingsUtil = {
  
}
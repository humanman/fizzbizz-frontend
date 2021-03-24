
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const env = process.env.REACT_APP_API_ENV

const timeMap = {
  "0": "9:00",
  "1": "10:00",
  "2": "11:00",
  "3": "12:00",
  "4": "1:00",
  "5": "2:00",
  "6": "3:00",
  "7": "4:00",
  "8": "5:00",
  "9": "6:00",
}

const handleCurrentBookings = (fetchedBookings) => {
  let obj = JSON.parse(JSON.stringify(fetchedBookings))

  
  if (fetchedBookings == undefined || fetchedBookings.length == 0) return false
  const company = window.sessionStorage.getItem('fizzbizz-companyname')
  const currentUser = window.sessionStorage.getItem('fizzbizz-username')
  let outputArr = []
  for (let booking of fetchedBookings) {
    if (!booking.hasOwnProperty('booking_id')) return false
    let dispatchObj = {}
    let bookingId = booking.booking_id
    let cellIds = booking.booking_id.split('|').slice(1)
  
    if (company == booking.company) {

      let roomId = `${ booking.room_id}`
      let roomName = `col${roomId}`
      let metadata = {}
      metadata.title = booking.booking_name
      metadata.user = booking.organizer_id
      metadata.booking = bookingId
      metadata.start = booking.start_time
      metadata.end = booking.end_time
      dispatchObj.metadata = metadata
      dispatchObj.slots = []
      
      for (const lookup of cellIds ) {
        let tempObj = {}
        let split = lookup.slice(0).split('-')
        let row = split[0]
        let time = timeMap[row]
        let col = split[1]
        row = parseInt(row)
        col = parseInt(col)

        tempObj.id = `${lookup}`
        tempObj.status = 'booked'
        tempObj.col = col
        tempObj.row = row
        tempObj.key = roomName
        tempObj.booking = bookingId
        tempObj.bookingtitle = booking.booking_name
        tempObj.organizer = booking.organizer_id
        tempObj.time = time

        let isUser = currentUser.toLowerCase() == booking.organizer_id.toLowerCase()
        dispatchObj.slots.push(tempObj)
 
        if (isUser) {
          dispatchObj.type = 'STATUS_BOOKED'
        } else {
          dispatchObj.type = 'STATUS_BLOCKED'
        }

      }
    
    }
    outputArr.push(dispatchObj)
  }

  return outputArr
  
}

const addBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking/new`

    return axios.post(url, {
        booking_id: req.booking_id,
        booking_name: req.booking_name, 
        organizer_id: req.organizer_id, 
        company : req.company,
        room_id: req.room_id,
        start_time: req.start_time,
        end_time: req.end_time
      })
      .then(response => response.config)
      .then(response => response ? handleCurrentBookings(response.data) : null)

}

const getBooking = () => (req={company, booking_id:null}) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking`
  return axios.get(url, {
    params: {
      "booking_id": req.booking_id,
      "company": req.company
    }})
    .then(response => JSON.parse(response.data))
    .then(response => handleCurrentBookings(response))

}

const updateBooking = () => (req) => {
  const url = `${API_BASE_URL}/${env}/api/v1/booking`

  try {
    axios.put(url, 
      {
        old_booking_id: req.bookingOld,
        booking_id: req.bookingNew,
        booking_name: req.organizer, // pubAddress
        company: req.company,
        room_id: req.roomId,
        start_time: req.startTime,
        end_time: req.endTime
      })
      .then(response => {

      })

  } catch {
    // preflight error // 'user address not found'
  }
}

const deleteBooking = () => (req) => {
  let bookingId = window.sessionStorage.getItem('selectedbooking')
  
  const url = `${API_BASE_URL}/${env}/api/v1/booking`
  // try/catch block validates user is logged in (pubAddress)
  // user must be the one on who booked as well!
  // TODO: convert to axios interceptor to preprocess request
  // will delete old booking and create new booking
  // TODO: address issue of latency between deleting and creating new booking

  return axios.delete(url, { params: {"company": req.company, "booking_id": req.booking_id}})
    .then(response => {
      window.sessionStorage.removeItem('selectedbooking')
    })

}

const bookingsUtil = {
  addBooking,
  getBooking,
  updateBooking,
  deleteBooking
}

export default  bookingsUtil

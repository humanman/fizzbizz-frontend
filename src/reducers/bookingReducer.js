import bookingsUtil from '../util/api/bookingsUtil';
const fetchedBookings = bookingsUtil.getBooking()
const company = sessionStorage.getItem('fizzbizz-companyname')
const initialState = () => {

  return {
    listIds: [],
    currentSelection: [],
    metaData: {},
    currentBookings: {}
  }
}

const boookingReducer = (state = initialState(), action) => {

  if (action.type === 'BOOKING_CREATE') {
    // fetch all after every api call
    state.currentBookings[action.bookingId] = action.details
  }
      

  // if (action.type === 'BOOKING_GET') {
  //   state.currentBookings = action.payload
    
  // }

  // if (action.type === 'BOOKING_UPDATE') {
  //   state.currentBookings = action.payload
  // }

  // if (action.type === 'BOOKING_DELETE') {
  //   state.currentBookings = action.payload
  // }

  if (action.type === 'BOOKING_HAS_CURRENT_RANGE') {
    state.currentSelection = action.currentSelection
  }
  
  if (action.type === 'BOOKING_META_DATA') {
    state.metaData = action.metaData
  }

  if (action.type === 'BOOKING_CONFIRMED') {
    state.currentSelection = []
    state.metaData = {}
  }

  if (action.type === 'BOOKING_CANCELED_PENDING') {
    state.currentSelection = []
    state.metaData = {}
  }

  return state
}

export default boookingReducer

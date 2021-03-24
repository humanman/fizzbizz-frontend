import bookingsUtil from '../util/api/bookingsUtil';
const fetchedBookings = bookingsUtil.getBooking()
const company = sessionStorage.getItem('fizzbizz-companyname')
const initialState = () => {
  // const newestBookings = fetchedBookings({ booking_id: null, company })

  // console.log(newestBookings)

  return {
    listIds: [],
    currentSelection: [],
    metaData: {},
    currentBookings: []
  }
}

// const initialState = () => {
//   let count = 0

//   let outputArr = []
//   while (count <= 10) {
//     let outputObj = {}
//     for (let innerCount = 1; innerCount <= 10; innerCount++) {
//       let currOuterCount = count
//       outputObj[`col${innerCount}`] = { id: `${currOuterCount}-${innerCount}`, status: 'free', col: innerCount, row: currOuterCount, key: `col${innerCount}`, booking: null, bookingtitle: null, organizer: null, time: timeMap[`${currOuterCount}`] }
//     }
//     outputArr.push(outputObj)
//     count++
//   }

//   return outputArr
// }


const boookingReducer = (state = initialState(), action) => {

  if (action.type === 'BOOKING_CREATE') {
    // fetch all after every api call
    state.currentBookings = action.payload
  }

  if (action.type === 'BOOKING_GET') {
    state.currentBookings = action.payload
  }

  if (action.type === 'BOOKING_UPDATE') {
    state.currentBookings = action.payload
  }

  if (action.type === 'BOOKING_DELETE') {
    state.currentBookings = action.payload
  }

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

  // this grabs available panel 

  // if (action.type === 'STATUS_BOOKED') {
  //   for (let act of action.slots) {
  //     state[act.row][act.key].status = 'booked'
  //     state[act.row][act.key].who = 'user'
  //   }
  // }

  // if (action.type === 'STATUS_HOLD') {
  //   for (const [i, act] of action.slots.entries()) {
  //     state[act.row][act.key].status = 'pending'
  //     state[act.row][act.key].who = 'user'
  //     state[act.row][act.key].bookingtitle = action.metadata.title
  //     state[act.row][act.key].organizer = action.metadata.user
  //     state[act.row][act.key].booking = action.metadata.booking
  //   }
  // }

  // if (action.type === 'STATUS_UNBOOKED') {
  //   for (let act of action.slots) {
  //     state[act.row][act.key].status = 'free'
  //     state[act.row][act.key].who = 'other'
  //     state[act.row][act.key].bookingtitle = ""
  //     state[act.row][act.key].organizer = ""
  //     state[act.row][act.key].booking = ""
  //   }
  // }

  return state
}

export default boookingReducer

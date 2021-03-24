// initialize booking state with matrix of 'free' 
const timeMap = {
  "0" : "9:00",
  "1" : "10:00",
  "2" : "11:00",
  "3" : "12:00",
  "4" : "1:00",
  "5" : "2:00",
  "6" : "3:00",
  "7" : "4:00",
  "8" : "5:00",
  "9" : "6:00",
}


const initialState = () => {
  let count = 0

  let outputArr = []
  while (count <= 10) {
    let outputObj = {}
    for (let innerCount = 1; innerCount <= 10; innerCount++) {
      let currOuterCount = count
      outputObj[`col${innerCount}`] = { id: `${currOuterCount}-${innerCount}`, status: 'free', col: innerCount, row: currOuterCount, key: `col${innerCount}`, booking: null, bookingtitle: null, organizer: null, time: timeMap[`${currOuterCount}`] }
    }
    outputArr.push(outputObj)
    count++
  }

  return outputArr
}


const statusReducer = (state = initialState(), action) => {

  // this grabs available panel 

  if (action.type === 'STATUS_BOOKED') {
    for (let act of action.slots) {
      state[act.row][act.key].status = 'booked' 
      state[act.row][act.key].who = 'user' 
      state[act.row][act.key].bookingtitle = action.metadata.title
      state[act.row][act.key].organizer = action.metadata.user
      state[act.row][act.key].booking = action.metadata.booking
    }
  }

  if (action.type === 'STATUS_BLOCKED') {
    for (let act of action.slots) {
      state[act.row][act.key].status = 'booked' 
      state[act.row][act.key].who = 'other' 
      state[act.row][act.key].bookingtitle = action.metadata.title
      state[act.row][act.key].organizer = action.metadata.user
      state[act.row][act.key].booking = action.metadata.booking
    }
  }

  if (action.type === 'STATUS_HOLD') {
    for (const [i, act] of action.slots.entries()) {
      state[act.row][act.key].status = 'pending'
      state[act.row][act.key].who = 'user'
      state[act.row][act.key].bookingtitle = action.metadata.title
      state[act.row][act.key].organizer = action.metadata.user
      state[act.row][act.key].booking = action.metadata.booking
    }
  }

  if (action.type === 'STATUS_UNBOOKED') {
    for (let act of action.slots) {
      state[act.row][act.key].status = 'free'
      state[act.row][act.key].who = 'other'
      state[act.row][act.key].bookingtitle = ""
      state[act.row][act.key].organizer = ""
      state[act.row][act.key].booking = ""
    }
  }

  return state
}





export default statusReducer
// initialize booking state with matrix of 'free' 
const initialState = () => {
  let count = 0

  let outputArr = []
  while (count <= 10) {
    let outputObj = {}
    for (let innerCount = 1; innerCount <= 10; innerCount++) {
      let currOuterCount = count
      outputObj[`col${innerCount}`] = { id: `${currOuterCount}-${innerCount}`, status: 'free', col: innerCount, row: currOuterCount, key: `col${innerCount}`}
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
    }

  }

  if (action.type === 'STATUS_HOLD') {
    for (let act of action.slots) {
      state[act.row][act.key].status = 'pending'
    }
  }

  if (action.type === 'STATUS_UNBOOKED') {
    for (let act of action.slots) {
      state[act.row][act.key].status = 'free'
    }
  }

  return state
}





export default statusReducer
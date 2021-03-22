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
export function selectAvailableSlots(selectionArr) {
  return  {
    type: 'CHECK_AVAILABLE',
    ...selectionArr
  }
}

const statusReducer = (state = initialState(), action) => {
  let outputArr = []

    return [
      ...state,
      ...outputArr
    ]
}
// const statusReducer = (state = initialState(), action) => {
//   // this grabs available panel 
//   console.log('initialState ', state, action)
//   if (action.type === 'CHECK_AVAILABLE') {
//     // look up individual cell 
//     let outputArr = []
//     for (const [idx, obj] of action.arr.entries()) {
//       outputArr.push(state.find(c => c.col == obj.col && c.row == obj.row))
//     }

//     return [
//       ...outputArr
//     ]
//   }

//   if (action.type === 'STATUS_BOOKED') {
//     return Object.assign({}, state, {
//       status: action.payload
//     })
//   }

//   if (action.type === 'STATUS_UNBOOKED') {
//     return Object.assign({}, state, {
//       status: 'free'
//     })
//   }

//   return state
// }





export default statusReducer
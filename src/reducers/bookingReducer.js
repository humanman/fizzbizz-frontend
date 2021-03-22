const initialState = {
  listIds: [],
  currentSelection: []
}

const boookingReducer = (state = initialState, action) => {
  if (action.type === 'BOOKING_HAS_CURRENT_RANGE') {
    state.currentSelection = action.currentSelection
  }
  if (action.type === 'BOOKING_CONFIRMED') {
    return Object.assign({}, state, {
      dialog: {}
    })
  }

  if (action.type === 'BOOKING_CANCELED_PENDING') {
    state.currentSelection = []
  }

  return state
}

export default boookingReducer

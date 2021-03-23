const initialState = {
  listIds: [],
  currentSelection: [],
  metaData: {}
}

const boookingReducer = (state = initialState, action) => {
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

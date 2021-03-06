const initialState = {
  confirm: true,
  edit: false,
  bookingId: null
}

const dashboardReducer = (state = initialState, action) => {
  if (action.type === 'DASH_SHOW_DIALOG') {
    return Object.assign({}, state, {
      confirm: true
    })
  }

  if (action.type === 'DASH_SELECT_BOOKING') {
    return Object.assign({}, state, {
      confirm: true,
      edit: true,
      bookingId: action.bookingId
    })
  }

  if (action.type === 'DASH_DESELECT_BOOKING') {
    return Object.assign({}, state, {
      confirm: false,
      edit: false,
      bookingId: action.bookingId
    })
  }

  if (action.type === 'DASH_DELETE_BOOKING') {
    return Object.assign({}, state, {
      confirm: false,
      edit: false,
      bookingId: null
    })
  }

  if (action.type === 'DASH_HIDE_DIALOG') {
    return Object.assign({}, state, {
      confirm: false
    })
  }

  return state
}

export default dashboardReducer

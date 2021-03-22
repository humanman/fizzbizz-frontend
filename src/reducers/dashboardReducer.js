const initialState = {
  dialog: {
    className: 'm-hide'
  }
}

const dashboardReducer = (state = initialState, action) => {
  if (action.type === 'DASH_SHOW_DIALOG') {
    return Object.assign({}, state, {
      dialog: {
        className: 'm-show'
      }
    })
  }
  if (action.type === 'DASH_CONFIRMED_BOOKING') {
    return Object.assign({}, state, {
      dialog: {}
    })
  }

  if (action.type === 'DASH_HIDE_DIALOG') {
    return Object.assign({}, state, {
      dialog: {
        className: 'm-hide'
      }
    })
  }

  return state
}

export default dashboardReducer

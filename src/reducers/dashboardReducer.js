const initialState = {
  confirm: true
}

const dashboardReducer = (state = initialState, action) => {
  if (action.type === 'DASH_SHOW_DIALOG') {
    return Object.assign({}, state, {
      confirm: true
    })
  }
  // if (action.type === 'DASH_CONFIRMED_BOOKING') {
  //   return Object.assign({}, state, {
  //     dialog: {}
  //   })
  // }

  if (action.type === 'DASH_HIDE_DIALOG') {
    return Object.assign({}, state, {
      confirm: false
    })
  }

  return state
}

export default dashboardReducer

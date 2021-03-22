import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './reducers/userReducer'
import statusReducer from './reducers/statusReducer'
import dashboardReducer from './reducers/dashboardReducer'
import bookingReducer from './reducers/bookingReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  status: statusReducer,
  dialog: dashboardReducer,
  booking: bookingReducer
})

export default reducer
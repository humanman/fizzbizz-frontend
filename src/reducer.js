import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './reducers/userReducer'
import statusReducer from './reducers/statusReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  status: statusReducer
})

export default reducer
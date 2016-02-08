import merge from 'lodash/merge'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  routing: routeReducer,
})


export default rootReducer

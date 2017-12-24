import { combineReducers } from 'redux'

import user from './user'
import pageData from './pageData'

export default combineReducers({
  user,
  pageData
})

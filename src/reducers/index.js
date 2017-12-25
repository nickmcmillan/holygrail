import { combineReducers } from 'redux'

import user from './user'
import contentPages from './contentPages'

export default combineReducers({
  user,
  contentPages,
})

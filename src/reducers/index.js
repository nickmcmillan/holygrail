import { combineReducers } from 'redux'

import user from './user'
import contentPages from './contentPages'
import posts from './posts'

export default combineReducers({
  user,
  contentPages,
  posts,
})

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './index.css'

import Routes from './routes'

// Let the reducers handle initial state
if (window.DATA && window.DATA !== '{{data}}') {
  window.DATA=JSON.parse(window.atob(window.DATA))
} else {
  window.DATA = {}
}

console.log(window.DATA)

const initialState = {
    pageData: window.DATA
}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
, document.getElementById('root')
)

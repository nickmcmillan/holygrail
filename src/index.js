import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'

import './index.css'

import App from './containers/App'

//import Routes from './routes'

// Let the reducers handle initial state
if (window.INITIAL_STATE && window.INITIAL_STATE !== '{{data}}') {
  // server converted it to base 64. lets unconvert it
  window.INITIAL_STATE = JSON.parse(window.atob(window.INITIAL_STATE))
} else {
  window.INITIAL_STATE = {}
}

const initialState = { ...window.INITIAL_STATE }
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'

import './index.css'

import App from './containers/App'


//import Routes from './routes'

// Let the reducers handle initial state
if (window.DATA && window.DATA !== '{{data}}') {
  window.DATA=JSON.parse(window.atob(window.DATA))
} else {
  window.DATA = {}
}

const initialState = {...window.DATA}

// {"user":{"email":"redux@goodness.com"},"contentPages":[{"_id":"5a42042dc585d1f8cc71ef2e","slug":"newfella","title":"newfella","__v":1,"author":"5a40f5ee98dc4894513617e4","publishedAt":"2017-12-25T13:00:00.000Z","content":{"brief":"<p>woo</p>","extended":"<p>asdfasdfasdfa</p>"},"state":"published","secondLevelPages":[{"_id":"5a41f86f2d7452a9c602cef6","slug":"hoho","title":"hoho","__v":0,"publishedDate":null,"content":{"brief":"","extended":""},"state":"published"}]},{"_id":"5a4205b6aadd580cce0e14ab","slug":"topppy","title":"topppy","__v":1,"author":"5a40f5ee98dc4894513617e4","publishedAt":"2017-12-26T08:18:07.869Z","content":{"brief":"","extended":""},"state":"published","secondLevelPages":[{"_id":"5a41f53b45188bd6c49cf756","key":"5a41f53b45188bd6c49cf756","title":"second level page","__v":0,"author":"5a40f5ee98dc4894513617e4","publishedDate":"2017-12-25T13:00:00.000Z","slug":"second-level-page","content":{"brief":"<p>secondoooo</p>","extended":"<p>asdf</p>"},"state":"published"},{"_id":"5a41f86f2d7452a9c602cef6","slug":"hoho","title":"hoho","__v":0,"publishedDate":null,"content":{"brief":"","extended":""},"state":"published"}]}],"posts":[]}

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root')
)
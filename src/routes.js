import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './containers/App'
import FirstPage from './containers/FirstPage'
import SecondPage from './containers/SecondPage'
import NoMatch from './components/NoMatch'
import Page from './containers/Page'


const Routes = props => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
		{/* for the homepage */}
        <IndexRoute component={FirstPage}/>
		{/* for hardcoded pages */}
        <Route path="second" component={SecondPage}/>
		{/*  for custom pages */}
		<Route path="/:page" component={Page}/>
		{/*  for catching error pages */}
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  )
}

export default Routes

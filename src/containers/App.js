import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import Dashboard from './Dashboard'
import Page from './Page'

import NoMatch from '../components/NoMatch'
import Nav from '../components/Nav'


export default class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <React.Fragment>
        <h1>hello3</h1>

        <Nav />

        <Switch>
          <Route exact path="/" component={FirstPage}/>
          {/* Hardcoded routes */}
          <Route exact path="/second" component={SecondPage}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/chip" render={() => (
            true ? (
              <Redirect to="/dashboard"/>
            ) : (
              <p>public homepage</p>
            )
          )}/>
          {/* custom page routes. the second level is optional (?) */}
          <Route exact path="/:topLevel/:secondLevel?" component={Page} />


          <Route component={NoMatch}/>
        </Switch>
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react'
import _ from 'lodash'



export default class App extends Component {
  render(){
    return (
      <div>
        <h1>My App CHIP</h1>
        {this.props.children}
      </div>
    )
  }
}

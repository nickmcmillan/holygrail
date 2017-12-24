import React, { Component } from 'react'
import { Link } from 'react-router'

const thing = []

export default class App extends Component {
    constructor(props) {
        super(props)

    }
  render(){
    return (
      <div>
        <h1>hello</h1>
        <ul>
            {thing.map(item => {
                return (
                    <li>
                        <Link to={'/'}>
                            um
                        </Link>
                    </li>
                )
            })}
        </ul>
        {this.props.children}
      </div>
    )
  }
}

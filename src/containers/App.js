import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import { Link } from 'react-router'

const thing = []

class App extends Component {
    constructor(props) {
        super(props)

    }
  render(){
    return (
      <div>
        <h1>hello</h1>
        <ul>
            {this.props.contentPages.map(item => {
                return (
                    <li key={item._id}>
                        <Link to={item.slug}>
                            {item.title}
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


const mapStateToProps = state => ({
  contentPages: state.contentPages
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

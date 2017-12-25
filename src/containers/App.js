import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import { Link } from 'react-router'

class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <React.Fragment>
        <h1>hello</h1>
        <nav>
          <ul>
            {this.props.contentPages.map(item =>
              <li key={item._id}>
                <Link to={item.slug}>
                  {item.title}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {this.props.children}
      </React.Fragment>
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

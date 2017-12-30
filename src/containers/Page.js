import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'

class Page extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // standard content pages could be long, we should scroll to the top whenever one mounts
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    // reset the scroll to top of page when we leave
    window.scrollTo(0, 0)
  }

  renderNotFound() {
    return <p>Custom page, but 404</p>
  }

  render() {
    const currentTopLevelPage = this.props.contentPages.find(
      page => page.slug === this.props.match.params.topLevel
    )

    // if a top level page data exists, then snoop through it for second level page data
    const currentSecondLevelPage =
      currentTopLevelPage &&
      currentTopLevelPage.secondLevelPages.find(
        page => page.slug === this.props.match.params.secondLevel
      )

    // determine if we're currently on a top level page
    const isTopLevel = !this.props.match.params.secondLevel
    // and based on that use it, or otherwise use child data
    const currentPage = isTopLevel
      ? currentTopLevelPage
      : currentSecondLevelPage

    if (!currentPage) {
      return this.renderNotFound()
    }

    const { slug, title } = currentPage
    const { brief, extended } = currentPage.content

    return (
      <div>
        <h2>Page.js</h2>
        <h3>{isTopLevel ? 'first' : 'second'}</h3>

        <ul>
          {/* <li>id {_id}</li> */}
          <li>slug {slug}</li>
          <li>title {title}</li>
          <div dangerouslySetInnerHTML={{ __html: brief }} />

          <div dangerouslySetInnerHTML={{ __html: extended }} />
        </ul>

        {/* <p>{JSON.stringify(this.props)}</p> */}
        <p>{'Email: ' + this.props.user.email}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contentPages: state.contentPages,
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)

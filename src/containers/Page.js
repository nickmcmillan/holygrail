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
        return (
            <p>Custom page, but 404</p>
        )
    }

    render() {

        // sift through all of the pages and find the one we're currently viewing.
        const currentPage = this.props.contentPages
        // make sure we use this.props.location - not window.location,
        // because this component is rendered on the server too!
        .find(page => page.slug === this.props.location.pathname.replace(/^\/|\/$/g, ''))

        if (!currentPage) {
            return this.renderNotFound()
        }

        const {slug, title} = currentPage
        const {brief, extended} = currentPage.content

        return (
            <div className="bold">
                <p>
                    Custom page
                </p>
                <ul>
                    {/* <li>id {_id}</li> */}
                    <li>slug {slug}</li>
                    <li>title {title}</li>
                    <div dangerouslySetInnerHTML={{ __html: brief }} />

                    <div dangerouslySetInnerHTML={{ __html: extended }} />
                </ul>


                <p>{JSON.stringify(this.props)}</p>
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
    userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)

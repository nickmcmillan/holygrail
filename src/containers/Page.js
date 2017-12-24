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

	render() {

        //console.log(this.props.pageData);

        const {slug, title, brief, extended} = this.props.pageData

		return (
			<div className="bold">
				<p>
					Custom page
				</p>
                <ul>
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
	pageData: state.pageData,
})

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)

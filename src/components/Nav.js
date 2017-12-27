import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
        <nav>
          <ul>
            {this.props.contentPages.map(item =>
              <li key={item._id}>
                <Link to={`/${item.slug}`}>
                  {item.title}
                </Link>
                {!!item.secondLevelPages.length &&
                    <ul>
                        {item.secondLevelPages.map(secondLevelItem => 
                            <li key={secondLevelItem._id}>
                                <Link to={`/${item.slug}/${secondLevelItem.slug}`}>
                                    {secondLevelItem.title}
                                </Link>
                            </li>
                        )}
                    </ul>
                }
              </li>
            )}
          </ul>
        </nav>
    )
  }
}

const mapStateToProps = state => ({
  contentPages: state.contentPages
})

export default connect(
  mapStateToProps
)(Nav)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NestedList = props => {

  if (!!props.item.childPages && !!props.item.childPages.length) {
    return (
      <ul>
        {props.item.childPages.map(nestedItem => {
          console.log(nestedItem)
          // if (nestedItem.isTopLevel) {
          return (
            <li key={nestedItem._id}>
              <Link
                to={`/${props.parentPath}/${nestedItem.slug}`}
              >
                {nestedItem.title}
              </Link>

              <NestedList
                item={nestedItem}
                parentPath={`${props.parentPath}/${nestedItem.slug}`}
              />
            </li>
          )
          //}
        })}
      </ul>
    )
  } else {
    return null
  }

}

const Nav = props => (
  <nav>
    <ul>
      {props.contentPages.map(item => {
        if (item.isTopLevel) {
          return (
            <li key={item._id}>
              <Link to={`/${item.slug}`}>{item.title}</Link>

              <NestedList parentPath={item.slug} item={item} />
          
            </li>
          )
        }
      })}
    </ul>
  </nav>
)

const mapStateToProps = state => ({
  contentPages: state.contentPages
})

export default connect(mapStateToProps)(Nav)

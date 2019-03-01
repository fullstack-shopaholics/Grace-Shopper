import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeDisplayName} from '../store/user'
import AllBooks from './AllBooks'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {displayName} = props

  return (
    <div>
      <br />
      <h3>Welcome, {displayName}</h3>
      <AllBooks />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    displayName: makeDisplayName(state.user.firstName, state.user.email)
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  displayName: PropTypes.string
}

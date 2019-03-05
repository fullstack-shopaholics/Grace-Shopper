import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeDisplayName} from '../store/user'
import AdminHome from './AdminHome'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar, Card} from 'react-bootstrap'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {displayName, user} = props

  return (
    <div>
      <br />
      <h5>Welcome, {displayName}</h5>
      <br />
      <ButtonToolbar style={{justifyContent: 'space-around'}}>
        <Link to="profile/update">
          <Button variant="secondary">Update Your Profile Information</Button>
        </Link>
        <Link to="profile/resetPassword">
          <Button variant="secondary">Reset Your Password</Button>
        </Link>
      </ButtonToolbar>
      <br />
      <br />
      {user.isAdmin && (
        <span>
          <hr />
          <AdminHome />
        </span>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    displayName: makeDisplayName(state.user.firstName, state.user.email),
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  displayName: PropTypes.string
}

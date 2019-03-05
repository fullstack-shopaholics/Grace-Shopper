import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeDisplayName} from '../store/user'
import AdminHome from './AdminHome'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar, Card} from 'react-bootstrap'
import DisplayPastOrders from './DisplayPastOrders'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {displayName, user} = props

  return (
    <div>
      <br />
      <h4>Welcome, {displayName}</h4>
      <ButtonToolbar>
        <Button
          as={Link}
          variant="secondary"
          to="/profile/orders"
          className="home-page-btn"
        >
          View Your Orders
        </Button>

        <Button
          as={Link}
          to="profile/update"
          variant="secondary"
          className="home-page-btn"
        >
          Update Your Profile Information
        </Button>

        <Button
          as={Link}
          to="profile/resetPassword"
          variant="secondary"
          className="home-page-btn"
        >
          Reset Your Password
        </Button>
      </ButtonToolbar>
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

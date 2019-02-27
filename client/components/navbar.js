import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const StyledNavbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand>The Book Stack</Navbar.Brand>
    <Nav className="mr-auto">
      {isLoggedIn ? (
        <Nav className="mr-auto">
          {/* The navbar will show these links after you log in */}
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link href="#" onClick={handleClick}>
            Logout
          </Nav.Link>
          {isAdmin && <Link to="/users">Users</Link>}
        </Nav>
      ) : (
        <Nav>
          {/* The navbar will show these links before you log in */}

          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>

          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
          <Nav.Link as={Link} to="/books">
            Books
          </Nav.Link>
        </Nav>
      )}
    </Nav>
    <hr />
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(StyledNavbar)

/**
 * PROP TYPES
 */
StyledNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

const StyledNavbar = ({handleClick, isLoggedIn, isAdmin, user, isGuest}) => (
  <Navbar bg="dark" variant="dark" className="justify-content-between">
    <Navbar.Brand as={Link} to="/books">
      BookStack
    </Navbar.Brand>

    {isLoggedIn ? (
      <Nav>
        {/* The navbar will show these links after you log in */}
        <Nav.Link to={`/user/${user.id}/cart`} as={Link}>
          Cart
        </Nav.Link>

        <NavDropdown title="My Account">
          <NavDropdown.Item as={Link} to="/home">
            My Account
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/profile/orders">
            My Orders
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/profile/update">
            Edit Account Settings
          </NavDropdown.Item>
          {isAdmin && <NavDropdown.Divider />}
          {isAdmin && (
            <NavDropdown.Item as={Link} to="/users">
              Manage Users
            </NavDropdown.Item>
          )}
          {isAdmin && (
            <NavDropdown.Item as={Link} to="/books/add">
              Add a Book
            </NavDropdown.Item>
          )}
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    ) : (
      <Nav>
        {/* The navbar will show these links before you log in */}
        <Nav.Link to="/user/guest/cart" as={Link} className="ml-auto">
          Cart
        </Nav.Link>

        <NavDropdown title="Account">
          <NavDropdown.Item as={Link} to="/login">
            Login
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/signup">
            Sign Up
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    )}

    <hr />
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    user: state.user,
    isGuest: state.user.isGuest
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

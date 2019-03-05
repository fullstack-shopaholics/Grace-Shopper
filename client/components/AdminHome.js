import React from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'

export const AdminHome = () => {
  return (
    <div>
      <h5>Admin Dashboard</h5>
      <ButtonToolbar>
        <Button
          as={Link}
          to="/users"
          variant="secondary"
          className="home-page-btn"
        >
          Manage Users
        </Button>

        <Button
          as={Link}
          to="/orders"
          variant="secondary"
          className="home-page-btn"
        >
          Manage Orders
        </Button>

        <Button
          as={Link}
          to="/books/add"
          variant="secondary"
          className="home-page-btn"
        >
          Add a Book
        </Button>
      </ButtonToolbar>
    </div>
  )
}

export default AdminHome

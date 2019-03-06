import React from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'

export const AdminHome = () => {
  return (
    <div>
      <h5>Admin Dashboard</h5>
      <ButtonToolbar>
        <Link to="/users">
          <Button variant="secondary" className="home-page-btn">
            Manage Users
          </Button>
        </Link>

        <Link to="/orders">
          <Button variant="secondary" className="home-page-btn">
            Manage Orders
          </Button>
        </Link>

        <Link to="/books/add">
          <Button variant="secondary" className="home-page-btn">
            Add a Book
          </Button>
        </Link>
      </ButtonToolbar>
    </div>
  )
}

export default AdminHome

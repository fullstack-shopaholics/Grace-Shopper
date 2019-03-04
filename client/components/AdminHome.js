import React from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'

export const AdminHome = () => {
  return (
    <ButtonToolbar style={{justifyContent: 'space-around'}}>
      <Link to="/users">
        <Button variant="secondary">Manage Users</Button>
      </Link>
      <Link to="/books/add">
        <Button variant="secondary">Add a Book</Button>
      </Link>
    </ButtonToolbar>
  )
}

export default AdminHome

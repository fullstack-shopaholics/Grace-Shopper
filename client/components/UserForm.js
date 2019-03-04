import {Form, Button} from 'react-bootstrap'
import React from 'react'

export const UserForm = props => {
  const {firstName, lastName, email} = props.user
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group controlId="UserFormFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          type="text"
          value={firstName}
          placeholder="FirstName"
          onChange={props.handleChange}
        />
      </Form.Group>

      <Form.Group controlId="UserFormLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          type="text"
          value={lastName}
          placeholder="LastName"
          onChange={props.handleChange}
        />
      </Form.Group>

      <Form.Group controlId="UserFormEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          name="email"
          type="text"
          value={email}
          placeholder="Email Address"
          required
          onChange={props.handleChange}
        />
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default UserForm

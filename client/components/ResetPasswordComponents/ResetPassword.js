import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {resetPassword} from '../../store/user'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.resetPassword(this.props.userId, this.state.password)
    this.props.history.push('/home')
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Reset Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Type New Password Here"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

const mapState = state => ({
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  resetPassword: (id, password) => dispatch(resetPassword(id, password))
})

export default connect(mapState, mapDispatch)(ResetPassword)

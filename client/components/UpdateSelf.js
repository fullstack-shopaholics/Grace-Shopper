import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserForm from './UserForm'
import {putSelf} from '../store/user'

export class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  componentDidMount = async () => {
    const {id, firstName, lastName, email} = this.props.user

    const user = {
      id,
      firstName,
      lastName,
      email
    }
    this.setState({...user})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.putSelf(this.state)
    this.props.history.push(`/home`)
  }

  render() {
    return (
      <div>
        <h3>Update Your Profile</h3>
        <UserForm
          user={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  putSelf: user => dispatch(putSelf(user))
})

export default connect(mapState, mapDispatch)(UpdateUser)

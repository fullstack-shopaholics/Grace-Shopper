import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteUser} from '../store/allusers'
import {Button} from 'react-bootstrap'

export class DeleteUserButton extends Component {
  handleClick = () => {
    this.props.deleteUser(this.props.id)
  }
  render() {
    return (
      <Button
        size="sm"
        variant="danger"
        onClick={this.handleClick}
        style={{float: 'right'}}
      >
        Delete User
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteUser: id => dispatch(deleteUser(id))
})

export default connect(null, mapDispatchToProps)(DeleteUserButton)

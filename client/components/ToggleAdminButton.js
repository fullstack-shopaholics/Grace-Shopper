import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleAdmin} from '../store/allusers'
import {Button} from 'react-bootstrap'

export class ToggleAdminButton extends Component {
  handleClick = () => {
    this.props.toggleAdmin(this.props.id, !this.props.isAdmin)
  }
  render() {
    return (
      <Button size="sm" variant="secondary" onClick={this.handleClick}>
        {this.props.isAdmin ? 'Remove Admin Status' : 'Make Admin'}
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleAdmin: (id, isAdmin) => dispatch(toggleAdmin(id, isAdmin))
})

export default connect(null, mapDispatchToProps)(ToggleAdminButton)

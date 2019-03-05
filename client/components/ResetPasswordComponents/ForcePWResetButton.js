import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleForcePWReset} from '../../store/allusers'
import {Button} from 'react-bootstrap'

export class ForcePWResetButton extends Component {
  handleClick = () => {
    this.props.toggleForcePWReset(this.props.id, !this.props.forcePWReset)
  }
  render() {
    return (
      <span>
        {!this.props.forcePWReset && (
          <Button size="sm" variant="secondary" onClick={this.handleClick}>
            Force Password Reset
          </Button>
        )}
      </span>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleForcePWReset: (id, forcePWReset) =>
    dispatch(toggleForcePWReset(id, forcePWReset))
})

export default connect(null, mapDispatchToProps)(ForcePWResetButton)

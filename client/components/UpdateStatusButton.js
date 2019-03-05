import React, {Component} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

export class UpdateStatusButton extends Component {
  handleClick = (event, id) => {
    this.props.editOrderStatus(id, event.target.name)
  }
  render() {
    const {order} = this.props
    return (
      <DropdownButton
        title="Update Status"
        disabled={order.status === 'Canceled' || order.status === 'Delivered'}
      >
        {order.status === 'Ordered' && (
          <Dropdown.Item
            name="Shipped"
            onClick={evt => this.handleClick(evt, order.id)}
          >
            Shipped
          </Dropdown.Item>
        )}
        {order.status !== 'Delivered' && (
          <Dropdown.Item
            name="Delivered"
            onClick={evt => this.handleClick(evt, order.id)}
          >
            Delivered
          </Dropdown.Item>
        )}
        <Dropdown.Item
          name="Canceled"
          onClick={evt => this.handleClick(evt, order.id)}
        >
          Canceled
        </Dropdown.Item>
      </DropdownButton>
    )
  }
}

export default UpdateStatusButton

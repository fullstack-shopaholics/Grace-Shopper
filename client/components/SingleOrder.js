import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder, editOrderStatus} from './../store/singleOrder'
import {Card, DropdownButton, Dropdown} from 'react-bootstrap'
import UpdateStatusButton from './UpdateStatusButton'

class SingleOrder extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getOrder(this.props.userId, orderId)
  }

  handleClick = (event, id) => {
    this.props.editOrderStatus(id, event.target.name)
  }

  render() {
    const order = this.props.order || {}
    const orderItems = order.orderItems || []
    return (
      <div>
        <h1>Order Summary</h1>
        <h2>Email: {order.email}</h2>
        <h3>Shipping Address: {order.address}</h3>
        <h3>Status: {order.status}</h3>
        {this.props.isAdmin && (
          <UpdateStatusButton
            order={order}
            editOrderStatus={this.props.editOrderStatus}
          />
        )}
        <h2>Items:</h2>
        {orderItems.map(item => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Title>
                Title: {item.book.title} by {item.book.author}
              </Card.Title>
              <div>
                Quantity: {item.quantity}
                <br />
                Price: ${item.book.price}
              </div>
            </Card.Body>
          </Card>
        ))}
        <h2>Subtotal: ${order.total}</h2>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.singleOrder,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(fetchOrder(userId, orderId)),
    editOrderStatus: (orderId, status) =>
      dispatch(editOrderStatus(orderId, status))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)

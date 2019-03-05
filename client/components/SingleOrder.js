import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from './../store/singleOrder'
import {Card} from 'react-bootstrap'

class SingleOrder extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getOrder(this.props.userId, orderId)
  }

  render() {
    const order = this.props.order || {}
    const orderItems = order.orderItems || []
    return (
      <div>
        <h1>Order</h1>
        <h2>Email: {order.email}</h2>
        <h2>Shipping Address: {order.address}</h2>
        <h2>Status: {order.status}</h2>
        <h2>Items:</h2>
        {orderItems.map(item => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Subtitle>Title: {item.book.title}</Card.Subtitle>
              <Card.Subtitle>Author: {item.book.author}</Card.Subtitle>
              <Card.Subtitle>Quantity: {item.quantity}</Card.Subtitle>
              <Card.Subtitle>Price: ${item.book.price}</Card.Subtitle>
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
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(fetchOrder(userId, orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)

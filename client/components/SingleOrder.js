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
        <h1>Order Summary</h1>
        <h2>Email: {order.email}</h2>
        <h3>Shipping Address: {order.address}</h3>
        <h3>Status: {order.status}</h3>
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
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(fetchOrder(userId, orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)

import React from 'react'
import {getUserOrders} from './../store/userOrders'
import {Card} from 'react-bootstrap'
import {connect} from 'react-redux'

class DisplayPastOrders extends React.Component {
  constructor() {
    super()
    this.formatDate = this.formatDate.bind(this)
  }
  componentDidMount() {
    this.props.getUserOrders(this.props.userId)
  }

  formatDate(dateStr) {
    const [splitDate] = dateStr.split('T')
    const [year, month, day] = splitDate.split('-')
    return `${month}/${day}/${year}`
  }

  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <h2>Past Orders</h2>
        {orders.map(order => (
          <div key={order.id}>
            <Card>
              <Card.Body>
                <Card.Subtitle>Shipping Address: {order.address}</Card.Subtitle>
                <Card.Subtitle>
                  Date: {this.formatDate(order.createdAt)}
                </Card.Subtitle>
                Items:{' '}
                {order.orderItems.map(item => (
                  <div key={item.id}>
                    Title: {item.book.title} Price: ${item.book.price} Quantity:{' '}
                    {item.quantity}
                  </div>
                ))}
                Subtotal: ${order.total}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.currentOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => dispatch(getUserOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(DisplayPastOrders)

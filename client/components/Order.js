import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class Orders extends React.Component {
  constructor() {
    super()
    this.formatDate = this.formatDate.bind(this)
  }

  formatDate(dateStr) {
    const [splitDate] = dateStr.split('T')
    const [year, month, day] = splitDate.split('-')
    return `${month}/${day}/${year}`
  }

  render() {
    const {order} = this.props
    return (
      <div>
        <Card style={{width: '94vw'}}>
          <Link to={`/order/${order.id}`}>
            <Card.Header style={{fontWeight: '400'}}>
              Order Placed {' ' + this.formatDate(order.createdAt)}
            </Card.Header>
          </Link>
          <Card.Body>
            <Card.Title>{order.status.toUpperCase()}</Card.Title>
            <ListGroup className="list-group-flush">
              {order.orderItems.map(item => (
                <ListGroup.Item key={item.id}>
                  <Link to={`/books/${item.bookId}`}>{item.book.title}</Link>
                  <div> ${item.book.price}</div>
                  <div>Quantity: {item.quantity}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            Subtotal: ${order.total}
          </Card.Body>
        </Card>
        <br />
      </div>
    )
  }
}

export default Orders

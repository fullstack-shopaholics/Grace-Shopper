import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from './../store/allorders'
import {Table, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  formatDate = dateStr => {
    const [splitDate] = dateStr.split('T')
    const [year, month, day] = splitDate.split('-')
    return `${month}/${day}/${year}`
  }

  render() {
    const orders = this.props.orders || []
    orders.sort((a, b) => +a.id - +b.id)
    console.log(orders)
    return (
      <div>
        <h4>Manage Orders</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order #</th>
              <th>User Email</th>
              <th>Date Ordered</th>
              <th>Status</th>
              <th>Update Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>{order.id}</Link>
                </td>
                <td>{order.email}</td>
                <td>{this.formatDate(order.createdAt)}</td>
                <td>{order.status}</td>
                <td>
                  <DropdownButton
                    title="Update Status"
                    disabled={
                      order.status === 'Canceled' ||
                      order.status === 'Delivered'
                    }
                  >
                    {order.status === 'Ordered' && (
                      <Dropdown.Item>Shipped</Dropdown.Item>
                    )}
                    {order.status !== 'Delivered' && (
                      <Dropdown.Item>Delivered</Dropdown.Item>
                    )}
                    <Dropdown.Item>Canceled</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.allOrders
})

const mapDispatch = dispatch => ({
  getAllOrders: () => dispatch(getAllOrders())
})

export default connect(mapState, mapDispatch)(AllOrders)

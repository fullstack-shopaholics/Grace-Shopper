import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from './../store/allorders'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {editOrderStatus} from '../store/singleOrder'
import UpdateStatusButton from './UpdateStatusButton'

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
                  <UpdateStatusButton
                    order={order}
                    editOrderStatus={this.props.editOrderStatus}
                  />
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
  getAllOrders: () => dispatch(getAllOrders()),
  editOrderStatus: (orderId, status) =>
    dispatch(editOrderStatus(orderId, status))
})

export default connect(mapState, mapDispatch)(AllOrders)

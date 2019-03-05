import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from './../store/allorders'
import {Table, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {editOrderStatus} from '../store/singleOrder'

export class AllOrders extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getAllOrders('all')
  }
  formatDate = dateStr => {
    const [splitDate] = dateStr.split('T')
    const [year, month, day] = splitDate.split('-')
    return `${month}/${day}/${year}`
  }

  handleClick = (event, id) => {
    this.props.editOrderStatus(id, event.target.name)
  }

  handleChange(evt) {
    this.props.getAllOrders(evt.target.value)
  }

  render() {
    const orders = this.props.orders || []
    orders.sort((a, b) => +a.id - +b.id)

    return (
      <div>
        <h4>Manage Orders</h4>
        <div>
          <label htmlFor="filter" style={{display: 'inline'}}>
            Filter By Status:{' '}
          </label>
          <select onChange={this.handleChange}>
            <option value="all" name="filter">
              Filter by status...
            </option>
            <option value="all" name="filter">
              All
            </option>
            <option value="Ordered" name="filter">
              Ordered
            </option>
            <option value="Shipped" name="filter">
              Shipped
            </option>
            <option value="Delivered" name="filter">
              Delivered
            </option>
            <option value="Canceled" name="filter">
              Canceled
            </option>
          </select>
        </div>
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
  getAllOrders: filter => dispatch(getAllOrders(filter)),
  editOrderStatus: (orderId, status) =>
    dispatch(editOrderStatus(orderId, status))
})

export default connect(mapState, mapDispatch)(AllOrders)

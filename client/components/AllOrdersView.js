import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from './../store/allorders'
import Order from './Order'

export class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <h4>Manage Orders</h4>
        {orders.map(order => <Order key={order.id} order={order} />)}
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

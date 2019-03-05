import React from 'react'
import {getUserOrders} from './../store/userOrders'
import Order from './Order'
import {connect} from 'react-redux'

class DisplayPastOrders extends React.Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.userId)
  }

  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <h4>Your Orders</h4>
        {orders.map(order => <Order key={order.id} order={order} />)}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    orders: state.currentOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => dispatch(getUserOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(DisplayPastOrders)

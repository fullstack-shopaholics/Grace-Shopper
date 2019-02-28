import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchItems(this.props.match.params.userId)
  }
  render() {
    const cartItems = this.props.cartItems || []
    return (
      <div>
        <h1>Shopping Cart</h1>
        {!cartItems.length ? (
          <h2>No Items in Cart!</h2>
        ) : (
          <ul>
            {cartItems.map(item => {
              return (
                <div key={item.id}>
                  <li>{item.book.title}</li>
                  <li>{item.book.price}</li>
                  <li>{item.quantity}</li>
                </div>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchItems: userId => dispatch(fetchCart(userId))
    // deleteItems: (userId, bookId) => dispatch(deleteItem(userId, bookId)),
    // updateQuantity: (userId, bookId) => dispatch(updateQuantity(userId, bookId))
    // purchase:
  }
}

export default connect(mapState, mapDispatch)(Cart)

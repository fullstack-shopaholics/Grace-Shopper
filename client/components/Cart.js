import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  getGuestCart,
  deleteFromCart,
  deleteFromGuestCart,
  editQuantity,
  editGuestQuantity
} from '../store/cart'
import {Card, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleQuantChange = this.handleQuantChange.bind(this)
    this.calculateSubtotal = this.calculateSubtotal.bind(this)
  }

  calculateSubtotal(cart) {
    return cart.reduce((total, currentItem) => {
      total = total + currentItem.book.price * currentItem.quantity
      return total
    }, 0)
  }

  componentDidMount() {
    if (!this.props.user.isGuest)
      this.props.fetchItems(this.props.match.params.userId)
    else this.props.getGuestCart()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id && !prevProps.user.id)
      this.props.fetchItems(this.props.match.params.userId)
  }

  handleClick(bookId) {
    if (this.props.user.isGuest) {
      this.props.deleteFromGuestCart(bookId)
    } else {
      const userId = Number(this.props.match.params.userId)
      this.props.deleteFromCart(bookId, userId)
    }
  }

  handleQuantChange(evt, bookId) {
    const newVal = Number(evt.target.value)
    if (this.props.user.isGuest) {
      this.props.editGuestQuantity(bookId, newVal)
    } else {
      const userId = Number(this.props.match.params.userId)
      this.props.editQuantity(userId, bookId, newVal)
    }
  }

  render() {
    const cartItems = this.props.cartItems || []
    return (
      <div>
        <h3>Shopping Cart</h3>
        {!cartItems.length || cartItems === undefined ? (
          <h5>Empty</h5>
        ) : (
          <div>
            <ul>
              {cartItems.map(item => {
                return (
                  <div key={item.book.id}>
                    <Card>
                      <Card.Body>
                        <Link to={`/books/${item.book.id}`}>
                          <Card.Title>{item.book.title}</Card.Title>
                        </Link>
                        <Card.Subtitle>Price: ${item.book.price}</Card.Subtitle>
                        <Form.Label>Quantity: </Form.Label>
                        <Form.Control
                          name="Quantity"
                          type="number"
                          min="0"
                          step="1"
                          value={item.quantity}
                          required
                          onChange={evt =>
                            this.handleQuantChange(evt, item.book.id)
                          }
                        />
                        <Button
                          variant="danger"
                          onClick={() => this.handleClick(item.book.id)}
                        >
                          Remove Item
                        </Button>
                      </Card.Body>
                    </Card>
                    <br />
                  </div>
                )
              })}
            </ul>
            <h2>Subtotal: ${this.calculateSubtotal(this.props.cartItems)}</h2>
            <Link to="/checkout">
              <Button>Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchItems: userId => dispatch(fetchCart(userId)),
    getGuestCart: () => dispatch(getGuestCart()),
    deleteFromCart: (bookId, userId) =>
      dispatch(deleteFromCart(bookId, userId)),
    deleteFromGuestCart: bookId => dispatch(deleteFromGuestCart(bookId)),
    editQuantity: (userId, bookId, quantity) =>
      dispatch(editQuantity(userId, bookId, quantity)),
    editGuestQuantity: (bookId, quantity) =>
      dispatch(editGuestQuantity(bookId, quantity))
    // deleteItems: (userId, bookId) => dispatch(deleteItem(userId, bookId)),
    // updateQuantity: (userId, bookId) => dispatch(updateQuantity(userId, bookId))
    // purchase:
  }
}

export default connect(mapState, mapDispatch)(Cart)

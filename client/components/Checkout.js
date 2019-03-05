import React from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchCart, getGuestCart, clearCart} from './../store/cart'
import {submitOrder} from '../store/userOrders'
import Stripe from './Stripe'

let states = [
  'AK',
  'AL',
  'AR',
  'AS',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'GU',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VI',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
]

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      name: '',
      street: '',
      town: '',
      zip: '',
      state: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.user.isGuest) {
      this.props.fetchCart(this.props.user.id)
      this.setState({
        email: this.props.user.email,
        name: `${this.props.user.firstName} ${this.props.user.lastName}`
      })
    } else this.props.getGuestCart()
  }

  componentDidUpdate(nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      this.props.fetchCart(this.props.user.id)
      this.setState({
        email: this.props.user.email,
        name: `${this.props.user.firstName} ${this.props.user.lastName}`
      })
    }
  }

  handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({[name]: value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {email, name, street, town, zip, state} = this.state
    const address = `${street}, ${town}, ${state}, ${zip}`
    const cart = this.props.cart.map(item => {
      const {book, quantity} = item
      return {book, quantity}
    })
    this.props.submitOrder(address, cart, email, this.props.user.id)
    this.setState({
      email: '',
      name: '',
      street: '',
      town: '',
      zip: '',
      state: ''
    })
    this.props.clearCart()
  }

  render() {
    let check = Object.values(this.state)
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={this.state.email}
              placeholder="email"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={this.state.name}
              placeholder="name"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              name="street"
              type="text"
              value={this.state.street}
              placeholder="street"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="town">
            <Form.Label>Town</Form.Label>
            <Form.Control
              name="town"
              type="text"
              value={this.state.town}
              placeholder="town"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zip"
              type="text"
              value={this.state.zip}
              placeholder="zip"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={this.state.state}
              required
              onChange={this.handleChange}
            >
              <option value={null}>Select State...</option>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        {this.props.cart.map(item => (
          <div key={item.book.id}>
            <Card>
              <Card.Body>
                <Card.Title>{item.book.title}</Card.Title>
                <Card.Subtitle>Price: ${item.book.price}</Card.Subtitle>
                <Card.Subtitle>Quantity: {item.quantity}</Card.Subtitle>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
        {!check.includes('') ? (
          <Stripe amount={this.state.subtotal} onSubmit={this.handleSubmit} />
        ) : (
          <Alert variant="warning">Complete Form</Alert>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user,
    subtotal: state.cart.reduce((total, currentItem) => {
      total = total + currentItem.quantity * currentItem.book.price
    }, 0)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    submitOrder: (address, cart, email, userId) =>
      dispatch(submitOrder(address, cart, email, userId)),
    getGuestCart: () => dispatch(getGuestCart()),
    clearCart: () => dispatch(clearCart())
  }
}

export default connect(mapState, mapDispatch)(Checkout)

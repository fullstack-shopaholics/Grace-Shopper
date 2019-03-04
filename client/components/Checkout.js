import React from 'react'
import {Form, Card, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

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

  handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({[name]: value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {email, name, street, town, zip, state} = this.state
    console.log(this.props.cart)
    const cart = this.props.cart.map(item => {
      const {book, quantity} = item
      return {book, quantity}
    })
    console.log(cart)
  }

  render() {
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
          <Button type="submit">Submit</Button>
        </Form>
        {this.props.cart.map(item => (
          <div key={item.book.id}>
            <Card>
              <Card.Body>
                <Card.Title>{item.book.title}</Card.Title>
                <Card.Subtitle>Price: ${item.book.price}</Card.Subtitle>
                <Card.Subtitle>Quantity: ${item.quantity}</Card.Subtitle>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    subtotal: state.cart.reduce((total, currentItem) => {
      total = total + currentItem.quantity * currentItem.book.price
    }, 0)
  }
}

export default connect(mapState, null)(Checkout)

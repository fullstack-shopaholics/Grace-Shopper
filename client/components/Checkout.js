import React from 'react'
import {Form} from 'react-bootstrap'

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

export default class Checkout extends React.Component {
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
  }

  handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({[name]: value})
    console.log(this.state)
  }

  render() {
    return (
      <Form>
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
    )
  }
}

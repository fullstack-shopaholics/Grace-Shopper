import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class TakeMoney extends React.Component {
  onToken = token => {
    // fetch('/save-stripe-token-test', {
    //   method: 'POST',
    //   body: JSON.stringify(token)
    // })
    this.props.onSubmit(event)
    console.log('Token === ', token)
  }

  render() {
    const {amount} = this.props
    const charge = Number(amount * 100)
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_PjYEHMeTcIduivMe25wGR53O"
        amount={charge}
      />
    )
  }
}

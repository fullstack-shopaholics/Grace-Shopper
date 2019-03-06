import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AddedToCartModal = props => {
  return (
    <Modal show={props.show} onHide={props.modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Successfully added{' ' + props.book.title + ' '} to Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.modalClose}>
          Close
        </Button>
        <Button
          as={Link}
          to={props.cartURL}
          variant="primary"
          onClick={props.modalClose}
        >
          Go To Cart
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapState = state => ({
  cartURL: state.user.isGuest
    ? '/user/guest/cart'
    : `/user/${state.user.id}/cart`
})

export default connect(mapState)(AddedToCartModal)

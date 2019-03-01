import React from 'react'
import {connect} from 'react-redux'
import {fetchBook, fetchReviews} from '../store/singleBook'
import BookReviews from './BookReviews'
import {Link} from 'react-router-dom'
import {addBookToCart} from '../store/cart'
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
  InputGroup
} from 'react-bootstrap'

export class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.props.loadBook(this.props.match.params.id)
    this.props.fetchReviews(this.props.match.params.id)
  }

  changeHandler(event) {
    const newQuan = Number(event.target.value)
    this.setState({
      quantity: newQuan
    })
  }

  clickHandler() {
    const userId = this.props.userId
    const bookId = this.props.match.params
    const quantity = this.state.quantity
    this.props.addBookToCart(userId, bookId, quantity)
    console.log('Added to Cart!')
  }

  render() {
    console.log(this.state)
    let selectedBookReviews = this.props.selectedBookReviews || []
    let {selectedBook, isAdmin} = this.props

    return (
      <Container>
        <br />
        <Row>
          <div className="singlePageImage">
            <Col>
              <Image src={selectedBook.photoUrl} rounded />
            </Col>
          </div>
          <Col>
            <h1>{selectedBook.title}</h1>
            {selectedBook.author && <h4>By {selectedBook.author.name}</h4>}
            <h5>${selectedBook.price}</h5>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Quantity
              </Form.Label>
              <InputGroup as={Col} sm={10}>
                <FormControl
                  type="number"
                  step="1"
                  min="1"
                  name="quantity"
                  placeholder="Quantity"
                  value={this.state.quantity}
                  onChange={this.changeHandler}
                />
                <InputGroup.Append>
                  <Button variant="secondary" onClick={this.clickHandler}>
                    Add To Cart
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <br />
            {isAdmin && (
              <Link to={`/books/${selectedBook.id}/update`}>
                <Button variant="secondary" style={{float: 'right'}}>
                  Update
                </Button>
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <p>{selectedBook.description}</p>
        </Row>
        <BookReviews reviews={selectedBookReviews} />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    selectedBook: state.singleBook.book,
    selectedBookReviews: state.singleBook.reviews,
    isAdmin: state.user.isAdmin,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadBook: id => dispatch(fetchBook(id)),
    fetchReviews: id => dispatch(fetchReviews(id)),
    addBookToCart: (userId, bookId, quantity) =>
      dispatch(addBookToCart(userId, bookId, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)

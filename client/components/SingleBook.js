import React from 'react'
import {connect} from 'react-redux'
import {fetchBook, fetchReviews} from '../store/singleBook'
import BookReviews from './BookReviews'
import {Link} from 'react-router-dom'
import {addBookToCart} from '../store/cart'
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
      <div>
        <h1>{selectedBook.title}</h1>
        {selectedBook.author && <h3>By {selectedBook.author.name}</h3>}
        <h5>${selectedBook.price}</h5>
        <p>{selectedBook.description}</p>
        <form>
          <input
            type="number"
            step="1"
            min="1"
            name="quantity"
            value={this.state.quantity}
            onChange={this.changeHandler}
          />
          Quantity
          <button type="button" onClick={this.clickHandler}>
            Add To Cart
          </button>
        </form>
        <BookReviews reviews={selectedBookReviews} />
        {isAdmin && <Link to={`/books/${selectedBook.id}/update`}>Update</Link>}
      </div>
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

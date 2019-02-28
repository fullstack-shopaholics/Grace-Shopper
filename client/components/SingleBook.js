import React from 'react'
import {connect} from 'react-redux'
import {fetchBook, fetchReviews} from '../store/singleBook'
import BookReviews from './BookReviews'
import {Link} from 'react-router-dom'

export class SingleBook extends React.Component {
  componentDidMount() {
    this.props.loadBook(this.props.match.params.id)
    this.props.fetchReviews(this.props.match.params.id)
  }
  render() {
    let selectedBookReviews = this.props.selectedBookReviews || []
    let {selectedBook, isAdmin} = this.props

    return (
      <div>
        <h1>{selectedBook.title}</h1>
        {selectedBook.author && <h3>By {selectedBook.author.name}</h3>}
        <h5>${selectedBook.price}</h5>
        <p>{selectedBook.description}</p>

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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadBook: id => dispatch(fetchBook(id)),
    fetchReviews: id => dispatch(fetchReviews(id))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)

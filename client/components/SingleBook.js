import React from 'react'
import {connect} from 'react-redux'
import {fetchBook, fetchReviews} from '../store/singleBook'
import BookReviews from './BookReviews'

export class SingleBook extends React.Component {
  componentDidMount() {
    this.props.loadBook(this.props.match.params.id)
    this.props.fetchReviews(this.props.match.params.id)
  }
  render() {
    let {selectedBook} = this.props
    let selectedBookReviews = this.props.selectedBookReviews || []
    return (
      <div>
        <h1>{selectedBook.title}</h1>
        <h5>${selectedBook.price}</h5>
        <p>{selectedBook.description}</p>
        <BookReviews reviews={selectedBookReviews} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedBook: state.singleBook.book,
    selectedBookReviews: state.singleBook.reviews
  }
}

const mapDispatch = dispatch => {
  return {
    loadBook: id => dispatch(fetchBook(id)),
    fetchReviews: id => dispatch(fetchReviews(id))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)

import React from 'react'
import {connect} from 'react-redux'

const AllBooks = props => {
  const {books} = props
  return (
    <div>
      <ul>
        {books === undefined || books.length === 0 ? (
          <li>No Books!</li>
        ) : (
          books.map(book => {
            return (
              <li key={book.id}>
                Title: {book.title} Price: {book.price}
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

const mapState = state => {
  return {
    books: state.books
  }
}

export default connect(mapState)(AllBooks)

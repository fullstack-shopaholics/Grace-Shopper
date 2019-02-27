import React from 'react'
import {connect} from 'react-redux'
import {CardDeck, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const AllBooks = props => {
  const {books} = props
  return (
    <div>
      <CardDeck>
        {books === undefined || books.length === 0 ? (
          <li>No Books!</li>
        ) : (
          books.map(book => {
            return (
              <Card key={book.id} style={{width: '250px'}}>
                <Card.Img variant="top" src={book.photoUrl} />
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.price}
                </Card.Subtitle>
              </Card>
            )
          })
        )}
      </CardDeck>
      {props.isAdmin && <Link to="/books/add">Add Book</Link>}
    </div>
  )
}

const mapState = state => {
  return {
    books: state.books,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(AllBooks)

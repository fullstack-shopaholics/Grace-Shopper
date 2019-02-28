import React from 'react'
import {connect} from 'react-redux'
import {CardDeck, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Filters from './Filters'

class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const filters = this.props.filters || []
    let books = filters.length === 0 ? this.props.books : this.props.filterBooks
    if (this.state.searchTerm) {
      books = books.filter(book => {
        return (
          book.title
            .toLowerCase()
            .indexOf(this.state.searchTerm.toLowerCase()) !== -1
        )
      })
    }
    return (
      <div>
        <Filters />
        <input
          type="search"
          placeholder="Search Books"
          value={this.state.searchTerm}
          name="searchTerm"
          onChange={this.changeHandler}
        />
        <CardDeck>
          {books === undefined || books.length === 0 ? (
            <li>No Books!</li>
          ) : (
            books.map(book => {
              return (
                <Link key={book.id} to={`/books/${book.id}`}>
                  <Card style={{width: '250px'}}>
                    <Card.Img variant="top" src={book.photoUrl} />
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      ${book.price}
                    </Card.Subtitle>
                  </Card>
                </Link>
              )
            })
          )}
        </CardDeck>
      </div>
    )
  }
}
const mapState = state => {
  return {
    books: state.books,
    filterBooks: state.filterCategories.filteredBooks,
    filters: state.filterCategories.categories
  }
}

export default connect(mapState)(AllBooks)

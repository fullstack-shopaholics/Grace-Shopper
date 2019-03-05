import React from 'react'
import {connect} from 'react-redux'
import {
  CardDeck,
  Card,
  Form,
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {fetchBooks} from '../store/book'

import Filters from './Filters'

const titleTrimmer = title => {
  return title.length > 70
    ? title.substring(0, 70 - 3) + '...'
    : title.substring(0, 70)
}

class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      page: 1
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  clickHandler(event) {
    let curpage = this.state.page
    if (event.target.name === 'next') {
      this.setState({page: curpage + 1})
      this.props.nextPage(this.state.page + 1)
    } else {
      this.setState({page: curpage - 1})
      this.props.nextPage(this.state.page - 1)
    }
  }

  render() {
    const filters = this.props.filters || []
    let books = filters.length === 0 ? this.props.books : this.props.filterBooks
    books = books.filter(book => book.inventoryQuantity > 0)
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
        <Container>
          <Row>
            <Col>
              <Form.Control
                type="search"
                placeholder="Search Books"
                value={this.state.searchTerm}
                name="searchTerm"
                onChange={this.changeHandler}
                style={{margin: '5px', width: '250px'}}
              />
            </Col>
            {this.props.isAdmin && (
              <Col>
                <Link to="/books/add">
                  <Button variant="secondary" style={{float: 'right'}}>
                    Add Book
                  </Button>
                </Link>
              </Col>
            )}
          </Row>

          <Filters />
        </Container>
        <CardDeck>
          {books === undefined || books.length === 0 ? (
            <li>No Books!</li>
          ) : (
            books.map(book => {
              return (
                <Link key={book.id} to={`/books/${book.id}`}>
                  <Card style={{width: '150px', height: '250px'}}>
                    <Card.Img
                      variant="top"
                      src={book.photoUrl}
                      style={{height: '175px'}}
                    />
                    <Card.Title style={{fontSize: '0.75rem'}}>
                      {titleTrimmer(book.title)}
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{fontSize: '0.75rem'}}
                    >
                      ${book.price}
                    </Card.Subtitle>
                  </Card>
                  <br />
                </Link>
              )
            })
          )}
        </CardDeck>
        {this.state.page > 1 ? (
          <div>
            <Button name="prev" onClick={this.clickHandler}>
              Prev
            </Button>
            <Button name="next" onClick={this.clickHandler}>
              Next
            </Button>
          </div>
        ) : (
          <Button name="next" onClick={this.clickHandler}>
            Next
          </Button>
        )}
      </div>
    )
  }
}
const mapState = state => {
  return {
    books: state.books,
    isAdmin: state.user.isAdmin,
    filterBooks: state.filterCategories.filteredBooks,
    filters: state.filterCategories.categories
  }
}

const mapDispatch = dispatch => {
  return {
    nextPage: page => dispatch(fetchBooks(page))
  }
}

export default connect(mapState, mapDispatch)(AllBooks)

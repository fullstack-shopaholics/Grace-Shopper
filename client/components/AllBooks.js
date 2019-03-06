/* eslint-disable complexity */
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
import PrevNextButton from './PrevNextButton'

import Filters from './Filters'

const titleTrimmer = title => {
  return title.length > 50
    ? title.substring(0, 50 - 3) + '...'
    : title.substring(0, 50)
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
        <Container fluid>
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
          {!filters.length ? (
            <PrevNextButton
              clickHandler={this.clickHandler}
              page={this.state.page}
            />
          ) : (
            <Row />
          )}
        </Container>
        <CardDeck style={{justifyContent: 'space-around'}}>
          {books === undefined || books.length === 0 ? (
            !filters.length ? (
              <p>loading</p>
            ) : (
              <p>No Books</p>
            )
          ) : (
            books.map(book => {
              return (
                <div key={book.id}>
                  <Card
                    as={Link}
                    key={book.id}
                    to={`/books/${book.id}`}
                    style={{
                      width: '300px',
                      height: '500px',
                      textDecoration: 'none',
                      margin: '15px'
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={book.photoUrl}
                      style={{height: '400px'}}
                    />
                    <Card.Title style={{fontSize: '1em'}}>
                      {titleTrimmer(book.title)}
                    </Card.Title>
                    {book.author && (
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{fontSize: '1em'}}
                      >
                        By{' ' + book.author}
                      </Card.Subtitle>
                    )}
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{fontSize: '1em'}}
                    >
                      ${book.price}
                    </Card.Subtitle>
                  </Card>
                  <br />
                </div>
              )
            })
          )}
        </CardDeck>
        <div>
          {!this.props.filterBooks.length &&
            this.state.page > 1 && (
              <Button name="prev" onClick={this.clickHandler}>
                Prev
              </Button>
            )}
          {!this.props.filterBooks.length &&
            this.state.page < Math.ceil(this.props.total / 50) && (
              <Button name="next" onClick={this.clickHandler}>
                Next
              </Button>
            )}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    books: state.books,
    isAdmin: state.user.isAdmin,
    filterBooks: state.filterCategories.filteredBooks,
    filters: state.filterCategories.categories,
    total: state.total
  }
}

const mapDispatch = dispatch => {
  return {
    nextPage: page => dispatch(fetchBooks(page))
  }
}

export default connect(mapState, mapDispatch)(AllBooks)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import BookForm from './BookForm'
import {fetchBook, putBook} from '../store/singleBook'
import {updateBook} from '../store/book'
import {fetchCategories} from '../store/category'

export class UpdateBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      photoUrl: '',
      author: '',
      categories: []
    }
  }

  componentDidMount = async () => {
    await this.props.fetchCategories()
    await this.props.fetchBook(this.props.match.params.id)
    const {
      id,
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl
    } = this.props.book

    const author = this.props.book.author ? this.props.book.author.name : ''
    const categories = this.props.book.categories.map(cat => cat.name)

    const book = {
      id,
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl,
      author,
      categories
    }
    this.setState({...book})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleCheckboxChange = event => {
    const checked = event.target.checked
    let categories = this.state.categories.slice()
    if (checked) {
      categories = [...categories, event.target.name]
    } else {
      categories = categories.filter(category => category !== event.target.name)
    }
    this.setState({categories})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.putBook(this.state)
    this.props.updateBook(this.state)
    this.props.history.push(`/books/${this.props.match.params.id}`)
  }

  render() {
    return (
      <BookForm
        book={this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleCheckboxChange={this.handleCheckboxChange}
        allCategories={
          this.props.allCategories
            ? this.props.allCategories.map(cat => cat.name)
            : []
        }
      />
    )
  }
}

const mapState = state => ({
  book: state.singleBook.book,
  allCategories: state.getCategories
})

const mapDispatch = dispatch => ({
  putBook: book => dispatch(putBook(book)),
  updateBook: book => dispatch(updateBook(book)),
  fetchBook: id => dispatch(fetchBook(id)),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(UpdateBook)

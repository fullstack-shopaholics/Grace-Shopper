import React, {Component} from 'react'
import {postBook} from '../store/book'
import {connect} from 'react-redux'
import BookForm from './BookForm'

export class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      photoUrl: '',
      author: '',
      categories: []
    }
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

  handleSubmit = event => {
    event.preventDefault()
    this.props.postBook(this.state)
    this.props.history.push('/books')
  }

  render() {
    return (
      <BookForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCheckboxChange={this.handleCheckboxChange}
        book={this.state}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  postBook: book => dispatch(postBook(book))
})

export default connect(null, mapDispatch)(AddBook)

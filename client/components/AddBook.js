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

  handleSubmit = event => {
    event.preventDefault()
    this.props.postBook(this.state)
  }

  render() {
    return (
      <BookForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        book={this.state}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  postBook: book => dispatch(postBook(book))
})

export default connect(null, mapDispatch)(AddBook)

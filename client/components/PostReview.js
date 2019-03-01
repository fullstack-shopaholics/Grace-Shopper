import React from 'react'
import {connect} from 'react-redux'
import {postReview} from './../store/singleBook'

export class PostReview extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const label = evt.target.name
    const val =
      label === 'content' ? evt.target.value : Number(evt.target.value)
    this.setState({[label]: val})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {content, rating} = this.state
    const {userId, selectedBook} = this.props
    this.props.postReview(selectedBook.id, userId, rating, content)
    this.setState({content: '', rating: null})
  }

  render() {
    return (
      <div>
        <h2>Write a Review:</h2>
        <form onSubmit={this.handleSubmit}>
          <textarea
            cols={40}
            rows={5}
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <div>
            <label htmlFor="rating">Stars: </label>
            <input
              type="radio"
              name="rating"
              value={1}
              onChange={this.handleChange}
              checked={this.state.rating === 1}
            />{' '}
            1
            <input
              type="radio"
              name="rating"
              value={2}
              onChange={this.handleChange}
              checked={this.state.rating === 2}
            />{' '}
            2
            <input
              type="radio"
              name="rating"
              value={3}
              onChange={this.handleChange}
              checked={this.state.rating === 3}
            />{' '}
            3
            <input
              type="radio"
              name="rating"
              value={4}
              onChange={this.handleChange}
              checked={this.state.rating === 4}
            />{' '}
            4
            <input
              type="radio"
              name="rating"
              value={5}
              onChange={this.handleChange}
              checked={this.state.rating === 5}
            />{' '}
            5
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postReview: (bookId, userId, rating, content) =>
      dispatch(postReview(bookId, userId, rating, content))
  }
}

export default connect(null, mapDispatch)(PostReview)

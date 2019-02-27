import React from 'react'
import {connect} from 'react-redux'
import {fetchBook} from '../store/singleBook'

export class SingleBook extends React.Component {
  componentDidMount() {
    this.props.loadBook(this.props.match.params.id)
  }
  render() {
    let {selectedBook} = this.props
    return (
      <div>
        <h1>{selectedBook.title}</h1>
        <h5>${selectedBook.price}</h5>
        <p>{selectedBook.description}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedBook: state.singleBook
  }
}

const mapDispatch = dispatch => {
  return {
    loadBook: id => dispatch(fetchBook(id))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)

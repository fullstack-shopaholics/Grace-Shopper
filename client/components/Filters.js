import React from 'react'
import {connect} from 'react-redux'
import {changeCategories, fetchFilteredBooks} from './../store/filters'

export class Filters extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(evt) {
    const newFilter = evt.target.name
    const checked = evt.target.checked
    await this.props.changeCategories(newFilter, checked)
    this.props.fetchFilteredBooks(this.props.filters)
  }

  render() {
    return (
      <form>
        <label htmlFor="Category">Horror</label>
        <input onChange={this.handleChange} type="checkbox" name="Horror" />

        <label htmlFor="Category">Sci-Fi</label>
        <input onChange={this.handleChange} type="checkbox" name="Sci-Fi" />

        <label htmlFor="Category">Romance</label>
        <input onChange={this.handleChange} type="checkbox" name="Romance" />

        {/* <button type="submit">Filter</button> */}
      </form>
    )
  }
}

const mapState = state => {
  return {
    filters: state.filterCategories.categories
  }
}

const mapDispatch = dispatch => {
  return {
    changeCategories: (category, display) =>
      dispatch(changeCategories(category, display)),
    fetchFilteredBooks: filters => dispatch(fetchFilteredBooks(filters))
  }
}

export default connect(mapState, mapDispatch)(Filters)

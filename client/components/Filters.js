import React from 'react'
import {connect} from 'react-redux'
import {changeCategories, fetchFilteredBooks} from './../store/filters'
import {fetchCategories} from '../store/category'

export class Filters extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  async handleChange(evt) {
    const newFilter = evt.target.name
    const checked = evt.target.checked
    await this.props.changeCategories(newFilter, checked)
    this.props.fetchFilteredBooks(this.props.filters)
  }

  render() {
    const {categories} = this.props
    return (
      <form>
        {categories.map(curCat => {
          return (
            <div key={curCat.id}>
              <label htmlFor="Category">{curCat.name}</label>
              <input
                onChange={this.handleChange}
                type="checkbox"
                name={curCat.name}
              />
            </div>
          )
        })}
      </form>
    )
  }
}

const mapState = state => {
  return {
    filters: state.filterCategories.categories,
    categories: state.getCategories
  }
}

const mapDispatch = dispatch => {
  return {
    changeCategories: (category, display) =>
      dispatch(changeCategories(category, display)),
    fetchFilteredBooks: filters => dispatch(fetchFilteredBooks(filters)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapState, mapDispatch)(Filters)

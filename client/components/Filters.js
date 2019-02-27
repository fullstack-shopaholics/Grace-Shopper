import React from 'react'
import {connect} from 'react-redux'
import {changeCategories} from './../store/filters'

export class Filters extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    const newFilter = evt.target.name
    const checked = evt.target.checked
    this.props.changeCategories(newFilter, checked)
  }

  render() {
    return (
      <form>
        <label htmlFor="Category">Horror</label>
        <input
          onChange={this.handleChange}
          type="checkbox"
          name="Horror"
          value="Horror"
        />

        <label htmlFor="Category">Sci-Fi</label>
        <input
          onChange={this.handleChange}
          type="checkbox"
          name="Sci-Fi"
          value="Sci-Fi"
        />

        <label htmlFor="Category">Romance</label>
        <input
          onChange={this.handleChange}
          type="checkbox"
          name="Romance"
          value="Romance"
        />

        {/* <button type="submit">Filter</button> */}
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    changeCategories: (category, display) =>
      dispatch(changeCategories(category, display))
  }
}

export default connect(null, mapDispatch)(Filters)

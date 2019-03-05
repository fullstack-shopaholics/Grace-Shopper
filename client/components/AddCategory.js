import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {
  postCategory,
  fetchCategories,
  destroyCategory
} from './../store/category'

class AddCategory extends React.Component {
  constructor() {
    super()
    this.state = {
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getCategories()
  }

  handleChange(evt) {
    const val = evt.target.value
    this.setState({category: val})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addCategory(this.state.category)
    this.setState({category: ''})
  }

  handleDelete(categoryId) {
    this.props.deleteCategory(categoryId)
  }

  render() {
    const categories = this.props.categories || []
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="bookFormTitle">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              name="category"
              type="text"
              value={this.state.category}
              placeholder="Category"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          <h1>All Categories</h1>
          {categories.map(category => (
            <div key={category.id}>
              <p style={{display: 'inline', padding: '20px'}}>
                {category.name}
              </p>
              <Button
                variant="danger"
                style={{margin: '10px'}}
                type="button"
                onClick={() => this.handleDelete(category.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.getCategories
  }
}

const mapDispatch = dispatch => {
  return {
    addCategory: category => dispatch(postCategory(category)),
    getCategories: () => dispatch(fetchCategories()),
    deleteCategory: id => dispatch(destroyCategory(id))
  }
}

export default connect(mapState, mapDispatch)(AddCategory)

import {Form, Button} from 'react-bootstrap'
import React from 'react'

const categoryNames = ['Sci-Fi', 'Art', 'Romance']

export const ComponentName = props => {
  const {
    title,
    description,
    price,
    inventoryQuantity,
    photoUrl,
    author,
    categories
  } = props.book
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group controlId="bookFormTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          required
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="bookFormAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          name="author"
          type="text"
          value={author}
          placeholder="Author"
          required
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="bookFormDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          type="text"
          value={description}
          placeholder="Description"
          required
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="bookFormPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          placeholder="Price"
          required
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="bookFormInv">
        <Form.Label>Inventory Quantity</Form.Label>
        <Form.Control
          name="inventoryQuantity"
          type="number"
          min="0"
          step="1"
          value={inventoryQuantity}
          placeholder="Inventory Quantity"
          required
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="bookFormPhotoUrl">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control
          name="photoUrl"
          type="url"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Genres</Form.Label>
        {categoryNames.map(catName => {
          return (
            <Form.Check
              custom
              type="checkbox"
              label={catName}
              name={catName}
              key={catName}
              id={catName}
              checked={categories.includes(catName)}
              onChange={props.handleCheckboxChange}
            />
          )
        })}
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default ComponentName

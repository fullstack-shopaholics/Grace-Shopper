/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Book = db.model('book')

describe.only('Book model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('books', () => {
    const book = {
      title: 'Issa Book',
      description: 'READ MORE BOOKS, IDIOT.',
      price: 1.99,
      inventoryQuantity: 5
    }

    beforeEach(async () => {
      await Book.create(book)
    })

    it('creats a book with the correct information', () => {
      expect(book.title).to.be.a('string')
      expect(book.title).to.equal('Issa Book')
      expect(book.price).to.be.a('number')
    })
  })
})

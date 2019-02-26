/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Book = db.model('book')

beforeEach(() => {
  return db.sync({force: true})
})

describe.only('Book routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET `/api/books`', () => {
    const book1 = {
      title: 'Issa Book',
      description: 'READ MORE BOOKS, IDIOT.',
      price: 1.99,
      inventoryQuantity: 5
    }

    beforeEach(async () => {
      await Book.create(book1)
    })

    it('GET /api/books', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(1)
      expect(res.body[0].title).to.equal(book1.title)
    })
  })
})

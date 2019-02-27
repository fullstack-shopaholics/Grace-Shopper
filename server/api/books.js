const router = require('express').Router()
const {Book, Author, Category} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [{model: Author}, {model: Category}]
    })
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    res.json(book)
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const {Book, Author, Category, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

router.put('/filter', async (req, res, next) => {
  try {
    const {filters} = req.body
    const books = await Book.findAll({
      include: [
        {
          model: Category,
          where: {name: {[Op.or]: filters}}
        }
      ]
    })

    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/review/:bookId', async (req, res, next) => {
  try {
    const {bookId} = req.params
    const reviews = await Review.findAll({
      where: {bookId},
      include: ['user']
    })

    res.json(reviews)
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

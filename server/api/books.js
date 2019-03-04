const router = require('express').Router()

const {Book, Category, Review, User} = require('../db/models')

const adminOnly = require('./isAdmin')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [{model: Category}]
    })
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id, {
      include: [{model: Category}]
    })
    res.json(book)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminOnly, async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl,
      author,
      categories
    } = req.body

    const bookCategories = await categories.reduce(async function(
      allCats,
      category
    ) {
      allCats = await allCats
      const categoryInstance = await Category.findOne({where: {name: category}})
      allCats.push(categoryInstance)
      return allCats
    },
    [])
    let newBook = await Book.create({
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl,
      author
    })
    await newBook.setCategories(bookCategories)
    newBook = await Book.findById(newBook.id, {
      include: [{model: Category}]
    })
    res.json(newBook)
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
          where: {name: {[Op.or]: filters}},
          attributes: ['name']
        }
      ]
    })

    const filteredBooks = books.filter(book => {
      return filters.every(filter => {
        return book.categories
          .map(bookCategory => bookCategory.name)
          .includes(filter)
      })
    })

    res.json(filteredBooks)
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

router.post('/review/:bookId', async (req, res, next) => {
  try {
    const {bookId} = req.params
    const {userId, content, rating} = req.body
    const createdReview = await Review.create({
      bookId,
      userId,
      content,
      rating
    })

    const review = await Review.findById(createdReview.id, {
      include: [{model: User}, {model: Book}]
    })

    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const book = await Book.findById(id)
    const {
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl,
      author,
      categories
    } = req.body

    const bookCategories = await categories.reduce(async function(
      allCats,
      category
    ) {
      allCats = await allCats
      const categoryInstance = await Category.findOne({where: {name: category}})
      allCats.push(categoryInstance)
      return allCats
    },
    [])

    let updatedBook = await book.update({
      title,
      description,
      price,
      inventoryQuantity,
      photoUrl,
      author
    })

    await updatedBook.setCategories(bookCategories)

    updatedBook = await Book.findById(updatedBook.id, {
      include: [{model: Category}]
    })

    res.json(updatedBook)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const {id} = req.params
    await Book.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

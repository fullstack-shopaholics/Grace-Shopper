const router = require('express').Router()
const {Book, Author, Category} = require('../db/models')
const adminOnly = require('./isAdmin')

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

    const [authorInstance] = await Author.findOrCreate({
      where: {
        name: author
      }
    })
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
      photoUrl
    })
    await newBook.setAuthor(authorInstance)
    await newBook.addCategories(bookCategories)
    newBook = await Book.findById(newBook.id, {
      include: [{model: Author}, {model: Category}]
    })
    res.json(newBook)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', adminOnly, async (req, res, next) => {
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
    const [authorInstance] = await Author.findOrCreate({
      where: {
        name: author
      }
    })
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
      photoUrl
    })

    await updatedBook.setAuthor(authorInstance)
    await updatedBook.setCategories(bookCategories)

    updatedBook = await Book.findById(updatedBook.id, {
      include: [{model: Author}, {model: Category}]
    })

    res.json(updatedBook)
  } catch (err) {
    next(err)
  }
})

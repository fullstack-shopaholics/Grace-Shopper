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

router.post('/', async (req, res, next) => {
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

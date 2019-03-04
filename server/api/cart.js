const router = require('express').Router()
const {User, BookCart, Book} = require('../db/models')

router.get('/guest', (req, res, next) => {
  if (!req.session.cart || req.session.cart.length === 0) req.session.cart = []
  res.json(req.session.cart)
})

router.get('/:userId', async (req, res, next) => {
  if (req.params.userId === 'guest') res.sendStatus(200)
  if (req.session.cart && req.session.cart.length > 0) {
    const addToCart = req.session.cart.map(item => {
      return BookCart.findOrCreate({
        where: {
          bookId: item.book.id,
          quantity: item.quantity,
          userId: req.params.userId
        }
      })
    })

    await Promise.all(addToCart)
    req.session.cart = []
  }

  try {
    let cart = await BookCart.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: Book
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/guest', async (req, res, next) => {
  if (!req.session.cart || req.session.cart.length === 0) req.session.cart = []
  try {
    const {bookId, quantity} = req.body
    const book = await Book.findById(bookId)
    const orderItem = {book, quantity}
    req.session.cart.push(orderItem)
    console.log(req.session.cart[1])
    res.send(orderItem)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const {bookId, quantity} = req.body
    const addedBook = await BookCart.create({
      bookId,
      quantity,
      userId: req.params.userId
    })

    const foundBook = await BookCart.findById(addedBook.id, {
      include: [{model: Book}]
    })

    res.json(foundBook)
  } catch (err) {
    next(err)
  }
})

router.delete('/guest', async (req, res, next) => {
  const {bookId} = req.body
  req.session.cart = req.session.cart.filter(item => item.book.id !== bookId)
  res.sendStatus(204)
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const {bookId} = req.body
    await BookCart.destroy({
      where: {
        userId,
        bookId
      }
    })

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/guest/changeQuantity', async (req, res, next) => {
  try {
    const {bookId, quantity} = req.body
    req.session.cart = req.session.cart.map(item => {
      if (bookId === item.book.id) return {...item, quantity}
      else return item
    })

    const updatedItem = req.session.cart.filter(item => bookId === item.book.id)

    res.json(updatedItem[0])
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/changeQuantity', async (req, res, next) => {
  try {
    const {userId} = req.params
    const {quantity, bookId} = req.body
    const [, updatedItem] = await BookCart.update(
      {
        quantity
      },
      {returning: true, where: {userId, bookId}}
    )

    const foundBook = await BookCart.findById(updatedItem[0].id, {
      include: [{model: Book}]
    })

    res.json(foundBook)
  } catch (err) {
    next(err)
  }
})

module.exports = router

//Needs post, put, delete routes

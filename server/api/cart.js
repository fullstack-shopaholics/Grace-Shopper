const router = require('express').Router()
const {User, BookCart, Book} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
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

router.post('/:userId', async (req, res, next) => {
  try {
    const {bookId, quantity} = req.body
    const addedBook = await BookCart.create({
      bookId,
      quantity,
      userId: req.params.userId
    })

    res.json(addedBook)
  } catch (err) {
    next(err)
  }
})

module.exports = router

//Needs post, put, delete routes

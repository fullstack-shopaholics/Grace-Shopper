const router = require('express').Router()
const {Order, OrderItem, Book} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const orders = await Order.findAll({
      where: {userId},
      include: [{model: OrderItem, include: {model: Book}}]
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router

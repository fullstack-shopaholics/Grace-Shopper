const router = require('express').Router()
const adminOnly = require('./isAdmin.js')
const {Order, OrderItem, Book} = require('../db/models')

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: OrderItem, include: [{model: Book}]}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/filterBy', adminOnly, async (req, res, next) => {
  const {filter} = req.body
  try {
    const orders = await Order.findAll({where: {status: filter}})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/updateStatus', adminOnly, async (req, res, next) => {
  const {id, status} = req.body
  try {
    const [, updatedOrder] = await Order.update(
      {status},
      {where: {id}, returning: true}
    )

    const order = await Order.findById(updatedOrder[0].id, {
      include: [{model: OrderItem, include: {model: Book}}]
    })

    res.json(order)
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

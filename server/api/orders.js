const router = require('express').Router()
const adminOnly = require('./isAdmin.js')
const selfOrAdmin = require('./selfOrAdmin')
const {Order, OrderItem, Book} = require('../db/models')

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const {filter} = req.query
    let orders
    if (filter === 'all') {
      orders = await Order.findAll({
        include: [{model: OrderItem, include: [{model: Book}]}]
      })
    } else {
      orders = await Order.findAll({
        where: {status: filter},
        include: [{model: OrderItem, include: [{model: Book}]}]
      })
    }

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

router.get('/:id/singleOrder/:orderId', selfOrAdmin, async (req, res, next) => {
  try {
    const {orderId} = req.params
    const order = await Order.findById(orderId, {
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

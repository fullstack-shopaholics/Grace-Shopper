const router = require('express').Router()
const {Category} = require('../db/models')
const adminOnly = require('./isAdmin.js')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({attributes: ['id', 'name']})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/create', adminOnly, async (req, res, next) => {
  try {
    const {filter} = req.body
    const newCategory = await Category.create({
      name: filter
    })
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

module.exports = router

const router = require('express').Router()
const {Category} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({attributes: ['id', 'name']})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router

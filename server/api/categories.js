const router = require('express').Router()
const {Category} = require('../db/models')
const adminOnly = require('./isAdmin.js')

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const categories = await Category.findAll({attributes: ['id', 'name']})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/create', adminOnly, async (req, res, next) => {
  try {
    const {category} = req.body
    const newCategory = await Category.create({
      name: category
    })
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

router.delete('/delete', adminOnly, async (req, res, next) => {
  console.log(req.query)
  const {categoryId} = req.query
  await Category.destroy({where: {id: categoryId}})
  res.sendStatus(204)
})

module.exports = router

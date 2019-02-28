const router = require('express').Router()
const {User} = require('../db/models')
const adminOnly = require('./isAdmin.js')
module.exports = router

router.use('/cart', require('./cart'))

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'isGuest', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminOnly, async (req, res, next) => {
  try {
    const {firstName, lastName, email, password, isGuest, isAdmin} = req.body

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      isGuest,
      isAdmin
    })

    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminOnly, async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin', 'isGuest']
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', adminOnly, async (req, res, next) => {
  try {
    const {id} = req.params
    const {password, isAdmin} = req.body

    let userBody = {}
    userBody = password ? {...userBody, password} : userBody
    userBody = isAdmin ? {...userBody, isAdmin} : userBody

    const [, updatedUser] = await User.update(userBody, {
      returning: true,
      where: {id},
      individualHooks: true
    })

    res.json(updatedUser[0])
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const {id} = req.params
    await User.destroy({where: {id}})

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

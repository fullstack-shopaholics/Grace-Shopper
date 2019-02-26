const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'userType']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password, userType} = req.body

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType
    })

    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'userType']
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const {password, userType} = req.body

    let userBody = {}
    userBody = password ? {...userBody, password} : userBody
    userBody = userType ? {...userBody, userType} : userBody

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

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    await User.destroy({where: {id}})

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

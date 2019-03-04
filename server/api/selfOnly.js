const selfOnly = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    const err = new Error('Access denied')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

module.exports = selfOnly

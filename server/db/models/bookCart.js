const Sequelize = require('sequelize')
const db = require('../db')

const BookCart = db.define('bookCart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = BookCart

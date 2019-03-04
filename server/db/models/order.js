const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Ordered',
    allowNull: false,
    validate: {
      isIn: [['Ordered', 'Shipped', 'Delivered']]
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  items: {
    type: Sequelize.JSON,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})

module.exports = Order

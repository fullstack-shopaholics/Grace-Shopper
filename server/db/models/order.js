const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Ordered',
    allowNull: false,
    validate: {
      isIn: [['Ordered', 'Shipped', 'Delivered', 'Canceled']]
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isNumeric: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = Order

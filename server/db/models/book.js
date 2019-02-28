const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png',
    validate: {
      isUrl: true
    }
  }
})

Book.beforeValidate(book => {
  book.photoUrl =
    book.photoUrl === ''
      ? 'http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png'
      : book.photoUrl
})

module.exports = Book

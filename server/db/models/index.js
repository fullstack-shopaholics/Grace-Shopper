const User = require('./user')

const Address = require('./address')
const Book = require('./book')
const Author = require('./author')
const Category = require('./category')

Address.belongsTo(User)
User.hasOne(Address)

Book.belongsTo(Author)
Author.hasMany(Book)

Book.belongsToMany(Category, {through: 'book_category'})
Category.belongsToMany(Book, {through: 'book_category'})


module.exports = {
  User,
  Address,
  Book,
  Author,
  Category
}

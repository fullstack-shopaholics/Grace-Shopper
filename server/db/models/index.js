const User = require('./user')

const Address = require('./address')
const Book = require('./book')
const Author = require('./author')
const Category = require('./category')
const Review = require('./review')

Address.belongsTo(User)
User.hasOne(Address)

Book.belongsTo(Author)
Author.hasMany(Book)

Book.belongsToMany(Category, {through: 'book_category'})
Category.belongsToMany(Book, {through: 'book_category'})

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Book)
Book.hasMany(Review)

module.exports = {
  User,
  Address,
  Book,
  Author,
  Category,
  Review
}

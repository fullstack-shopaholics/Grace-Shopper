const User = require('./user')
const Address = require('./address')
const Book = require('./book')
const Category = require('./category')
const Review = require('./review')
const BookCart = require('./bookCart')
const Order = require('./order')
const OrderItem = require('./orderItem')

Address.belongsTo(User)
User.hasOne(Address)

Book.belongsToMany(Category, {through: 'book_category'})
Category.belongsToMany(Book, {through: 'book_category'})

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Book)
Book.hasMany(Review)

BookCart.belongsTo(User)
User.hasMany(BookCart)

BookCart.belongsTo(Book)
Book.hasMany(BookCart)

Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

OrderItem.belongsTo(Book)
Book.hasMany(OrderItem)

module.exports = {
  User,
  Address,
  Book,
  Category,
  Review,
  BookCart,
  Order,
  OrderItem
}

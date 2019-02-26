const User = require('./user')
const Book = require('./book')
const Author = require('./author')
const Category = require('./category')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Book.belongsTo(Author)
Author.hasMany(Book)

Book.belongsToMany(Category, {through: 'book_category'})
Category.belongsToMany(Book, {through: 'book_category'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Author,
  Category
}

const {green, red} = require('chalk')
const {Book, Author, Category} = require('./server/db/models')
const db = require('./server/db')

//Dummy Books
const book1 = {
  title: 'Issa Book',
  description: 'READ MORE BOOKS, IDIOT.',
  price: 1.99,
  inventoryQuantity: 5
}
const book2 = {
  title: 'BOOKSTUFF',
  description: 'Heres some stuff in a book.',
  price: 2.99,
  inventoryQuantity: 10
}
const book3 = {
  title: 'Cody The Pug: The True Story',
  description: 'This is a book written by Cody the Pug.',
  price: 5.99,
  inventoryQuantity: 1
}

const books = [book1, book2, book3]

//Dummy Authors
const author1 = {name: 'Cody'}
const author2 = {name: 'Fullstack'}
const author3 = {name: 'Unproductive Author'}

const authors = [author1, author2, author3]

//Categories
const cat1 = {name: 'Horror'}
const cat2 = {name: 'Sci-Fi'}
const cat3 = {name: 'Romance'}

const categories = [cat1, cat2, cat3]

const seed = async () => {
  try {
    await db.sync({force: true})
    const createdBooks = Book.bulkCreate(books, {returning: true})
    const createdAuthors = Author.bulkCreate(authors, {returning: true})
    const createdCats = Category.bulkCreate(categories, {returning: true})

    const [savedBooks, savedAuthors, savedCats] = await Promise.all([
      createdBooks,
      createdAuthors,
      createdCats
    ])

    const madeStuff = await Promise.all([
      savedBooks[0].setAuthor(savedAuthors[0]),
      savedBooks[1].setAuthor(savedAuthors[0]),
      savedBooks[2].setAuthor(savedAuthors[1]),

      savedBooks[0].addCategory(savedCats[0]),
      savedBooks[0].addCategory(savedCats[1]),
      savedBooks[1].addCategory(savedCats[1]),
      savedBooks[2].addCategory(savedCats[1])
    ])
    return madeStuff
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
// If this module is being required from another module (i.e. for testing), then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}

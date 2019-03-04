'use strict'

const db = require('../server/db')
const {User, Book, Category, Review} = require('../server/db/models')

const artBooks = require('./dummyDataFiles/artBooks')
const classics = require('./dummyDataFiles/classics')
const childrensBooks = require('./dummyDataFiles/childrensBooks')
const bios = require('./dummyDataFiles/biosAndMemiors')
const sciFiBooks = require('./dummyDataFiles/sciFiBooks')
const cookBooks = require('./dummyDataFiles/cookbooksFoodAndWineBooks')
const mysteryBooks = require('./dummyDataFiles/mysteryBooks')

const review1 = {
  content: 'Nice!',
  rating: 4
}

const review2 = {
  content: 'Eh not thzt nice...',
  rating: 2
}

const review3 = {
  content: 'Best Book Ever!!!!',
  rating: 5
}

const reviews = [review1, review2, review3]

//Categories
const cat1 = {name: 'Art'}
const cat2 = {name: 'Classics'}
const cat3 = {name: `Children's Books`}
const cat4 = {name: `Biographies and Memiors`}
const cat5 = {name: 'Science Fiction'}
const cat6 = {name: 'Cookbooks, Food & Wine'}
const cat7 = {name: 'Mystery, Thriller & Suspense'}

const categories = [cat1, cat2, cat3, cat4, cat5, cat6, cat7]

const user1 = {email: 'cody@email.com', password: '123', isGuest: false}
const user2 = {email: 'murphy@email.com', password: '123', isGuest: false}
const user3 = {
  firstName: 'Zach',
  lastName: 'Marszal',
  email: 'zm@email.com',
  isAdmin: true,
  isGuest: false,
  password: '123'
}
const user4 = {
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@admin.com',
  isAdmin: true,
  isGuest: false,
  password: '12345'
}

const users = [user1, user2, user3, user4]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const createdArtBooks = Book.bulkCreate(artBooks, {returning: true})
  const createdClassics = Book.bulkCreate(classics, {returning: true})
  const createdChildrensBooks = Book.bulkCreate(childrensBooks, {
    returning: true
  })
  const createdBios = Book.bulkCreate(bios, {returning: true})
  const createdSciFi = Book.bulkCreate(sciFiBooks, {returning: true})
  const createdCookbooks = Book.bulkCreate(cookBooks, {returning: true})
  const createdMysteries = Book.bulkCreate(mysteryBooks, {returning: true})

  const createdCats = Category.bulkCreate(categories, {returning: true})
  const createdReviews = Review.bulkCreate(reviews, {returning: true})
  const createdUsers = User.bulkCreate(users, {returning: true})

  const [
    savedArtBooks,
    savedClassics,
    savedChildrensBooks,
    savedBios,
    savedSciFi,
    savedCookbooks,
    savedMysteries,
    savedCats,
    savedReviews,
    savedUsers
  ] = await Promise.all([
    createdArtBooks,
    createdClassics,
    createdChildrensBooks,
    createdBios,
    createdSciFi,
    createdCookbooks,
    createdMysteries,
    createdCats,
    createdReviews,
    createdUsers
  ])

  await Promise.all([
    savedReviews[0].setUser(savedUsers[2]),
    savedReviews[1].setUser(savedUsers[1]),
    savedReviews[2].setUser(savedUsers[0]),

    savedReviews[0].setBook(savedArtBooks[0]),
    savedReviews[1].setBook(savedArtBooks[0]),
    savedReviews[2].setBook(savedArtBooks[2])
  ])

  const art_books = savedArtBooks.map(book => book.addCategory(savedCats[0]))
  const classic_books = savedClassics.map(book =>
    book.addCategory(savedCats[1])
  )
  const childrens_books = savedChildrensBooks.map(book =>
    book.addCategory(savedCats[2])
  )
  const bios_books = savedBios.map(book => book.addCategory(savedCats[3]))
  const sci_fi_books = savedSciFi.map(book => book.addCategory(savedCats[4]))
  const cookbooks_food_and_wine_books = savedCookbooks.map(book =>
    book.addCategory(savedCats[5])
  )
  const mystery_books = savedMysteries.map(book =>
    book.addCategory(savedCats[6])
  )

  const allBooks = art_books.concat(
    classic_books,
    childrens_books,
    bios_books,
    sci_fi_books,
    cookbooks_food_and_wine_books,
    mystery_books
  )
  await Promise.all(allBooks)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${allBooks.length} books`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

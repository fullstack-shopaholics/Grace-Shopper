'use strict'

const db = require('../server/db')
const {User, Book, Category, Review} = require('../server/db/models')
const artBooks = require('./dummyDataFiles/dummyArtBookData')
const classics = require('./dummyDataFiles/dummyClassicFictionData')

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
const cat3 = {name: 'Romance'}

const categories = [cat1, cat2, cat3]

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
  const createdCats = Category.bulkCreate(categories, {returning: true})
  const createdReviews = Review.bulkCreate(reviews, {returning: true})
  const createdUsers = User.bulkCreate(users, {returning: true})

  const [
    savedArtBooks,
    savedClassics,
    savedCats,
    savedReviews,
    savedUsers
  ] = await Promise.all([
    createdArtBooks,
    createdClassics,
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

  await Promise.all(art_books.concat(classic_books))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${art_books.length + classic_books.length} books`)
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

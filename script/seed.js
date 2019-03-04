'use strict'

const db = require('../server/db')
const {User, Book, Category, Review, Order} = require('../server/db/models')
const artBooks = require('./dummyArtBookData')

//Reviews
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
const cat2 = {name: 'Sci-Fi'}
const cat3 = {name: 'Romance'}

const categories = [cat1, cat2, cat3]

//Users
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

//Orders
const order1 = {
  address: '123 Main Street, Hometown IL, 60657',
  items: [
    {
      title: 'A Book',
      id: 5,
      descriptions: 'heres words...',
      quantity: 1
    },
    {
      title: 'A Different Book',
      id: 1,
      descriptions: 'heres different words...',
      quantity: 1
    }
  ]
}
const order2 = {
  address: '543 Valid Road, Funtown MI, 40632',
  items: [
    {
      title: 'FUNBOOK',
      id: 7,
      descriptions: 'heres FUN STUFF',
      quantity: 1
    },
    {
      title: 'FUNBOOK2',
      id: 8,
      descriptions: 'heres different FUN words...',
      quantity: 1
    }
  ]
}
const order3 = {
  address: '5882300 Empire Road, Chicago IL, 60640',
  items: [
    {
      title: 'Carpet 101',
      id: 58,
      descriptions: 'heres carpet words...',
      quantity: 1
    },
    {
      title: 'A Different Carpet Book',
      id: 59,
      descriptions: 'heres different carpet words...',
      quantity: 1
    }
  ]
}

const orders = [order1, order2, order3]

// Seeding

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const createdArtBooks = Book.bulkCreate(artBooks, {returning: true})
  const createdCats = Category.bulkCreate(categories, {returning: true})
  const createdReviews = Review.bulkCreate(reviews, {returning: true})
  const createdUsers = User.bulkCreate(users, {returning: true})
  const createdOrders = Order.bulkCreate(orders, {returning: true})

  const [
    savedBooks,
    savedCats,
    savedReviews,
    savedUsers,
    savedOrders
  ] = await Promise.all([
    createdArtBooks,
    createdCats,
    createdReviews,
    createdUsers,
    createdOrders
  ])

  await Promise.all([
    savedReviews[0].setUser(savedUsers[2]),
    savedReviews[1].setUser(savedUsers[1]),
    savedReviews[2].setUser(savedUsers[0]),

    savedReviews[0].setBook(savedBooks[0]),
    savedReviews[1].setBook(savedBooks[0]),
    savedReviews[2].setBook(savedBooks[2]),

    savedOrders[0].setUser(savedUsers[0]),
    savedOrders[1].setUser(savedUsers[1]),
    savedOrders[2].setUser(savedUsers[0])
  ])

  const art_books = savedBooks.map(book => book.addCategory(savedCats[0]))

  await Promise.all(art_books)

  console.log(`seeded ${users.length} users`)
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

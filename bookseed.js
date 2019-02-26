const {db, Book, Author, Category} = require('./server/db')

//Dummy Books
const book1 = {
  title: 'Issa Book',
  desription: 'READ MORE BOOKS, IDIOT.',
  price: 1.99,
  inventoryQuantity: 5
}
const book2 = {
  title: 'BOOKSTUFF',
  desription: 'Heres some stuff in a book.',
  price: 2.99,
  inventoryQuantity: 10
}
const book3 = {
  title: 'Cody The Pug: The True Story',
  desription: 'This is a book written by Cody the Pug.',
  price: 5.99,
  inventoryQuantity: 1
}

const books = [book1, book2, book3]

//Dummy Authors
const author1 = {name: 'Cody'}
const author2 = {name: 'Fullstack'}

const authors = [author1, author2]

//Categories
const cat1 = {name: 'Horror'}
const cat2 = {name: 'Sci-Fi'}
const cat3 = {name: 'Romance'}

const categories = [cat1, cat2, cat3]

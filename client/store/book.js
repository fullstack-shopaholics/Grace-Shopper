import axios from 'axios'

const initialState = []

const SET_BOOKS = 'SET_BOOKS'
const ADD_BOOK = 'ADD_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK'

export const setBooks = books => ({
  type: SET_BOOKS,
  books
})

export const addBook = book => ({
  type: ADD_BOOK,
  book
})

export const updateBook = book => ({
  type: UPDATE_BOOK,
  book
})

export const fetchBooks = page => async dispatch => {
  try {
    if (!page) page = 1
    const res = await axios.get('/api/books', {params: {page}})
    const data = res.data
    dispatch(setBooks(data))
  } catch (err) {
    console.error(err)
  }
}

export const postBook = book => async dispatch => {
  try {
    const res = await axios.post('/api/books', book)
    const data = res.data
    dispatch(addBook(data))
  } catch (err) {
    console.error(err)
  }
}

export const books = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books]
    case ADD_BOOK:
      return [...state, action.book]
    case UPDATE_BOOK:
      return state.map(
        book => (book.id !== action.book.id ? book : action.book)
      )
    default:
      return state
  }
}

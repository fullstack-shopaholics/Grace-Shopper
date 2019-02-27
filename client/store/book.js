import axios from 'axios'

const initialState = []

export const SET_BOOKS = 'SET_BOOKS'

export const setBooks = books => ({
  type: SET_BOOKS,
  books
})

export const fetchBooks = () => async dispatch => {
  try {
    const res = await axios.get('/api/books')
    const data = res.data
    dispatch(setBooks(data))
  } catch (err) {
    console.error(err)
  }
}

export const books = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books]
    default:
      return state
  }
}

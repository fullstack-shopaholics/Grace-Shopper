import axios from 'axios'

const initialState = {
  book: {},
  reviews: []
}

export const SET_BOOK = 'SET_BOOK'
const GET_REVIEWS = 'GET_REVIEWS'

export const getReviews = reviews => ({type: GET_REVIEWS, reviews})

export const setBook = book => ({
  type: SET_BOOK,
  book
})

export const fetchBook = id => async dispatch => {
  try {
    let res = await axios.get(`/api/books/${id}`)
    let data = res.data
    dispatch(setBook(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchReviews = id => async dispatch => {
  try {
    const result = await axios.get(`/api/books/review/${id}`)
    const reviews = result.data
    dispatch(getReviews(reviews))
  } catch (err) {
    console.err(err)
  }
}

export const singleBook = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK:
      return {...state, book: action.book}
    case GET_REVIEWS:
      return {...state, reviews: action.reviews}
    default:
      return state
  }
}

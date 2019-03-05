import axios from 'axios'

const initialState = {
  book: {},
  reviews: []
}

// ACTION TYPES
export const SET_BOOK = 'SET_BOOK'
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

export const getReviews = reviews => ({type: GET_REVIEWS, reviews})

export const addReview = review => ({type: ADD_REVIEW, review})

// ACTION CREATORS
export const setBook = book => ({
  type: SET_BOOK,
  book
})

// THUNK CREATORS
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
    console.error(err)
  }
}

export const postReview = (
  bookId,
  userId,
  rating,
  content
) => async dispatch => {
  try {
    const result = await axios.post(`/api/books/review/${bookId}`, {
      userId,
      content,
      rating
    })
    const review = result.data
    dispatch(addReview(review))
  } catch (err) {
    console.error(err)
  }
}

export const putBook = book => async dispatch => {
  try {
    const {data} = await axios.put(`/api/books/${book.id}`, book)
    dispatch(setBook(data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export const singleBook = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK:
      return {...state, book: action.book}
    case GET_REVIEWS:
      return {...state, reviews: action.reviews}
    case ADD_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}

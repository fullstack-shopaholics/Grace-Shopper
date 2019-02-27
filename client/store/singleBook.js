import axios from 'axios'

const initialState = {}

export const SET_BOOK = 'SET_BOOK'

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

export const singleBook = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK:
      return action.book
    default:
      return state
  }
}

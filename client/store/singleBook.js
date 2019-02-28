import axios from 'axios'

const initialState = {}

// ACTION TYPES
export const SET_BOOK = 'SET_BOOK'

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
      return action.book
    default:
      return state
  }
}

import axios from 'axios'

const initialState = []

export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addToCart = book => ({
  type: ADD_TO_CART,
  book
})

export const fetchCart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/cart/${userId}`)
    const data = res.data
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addBookToCart = (userId, book, quantity) => async dispatch => {
  try {
    const bookId = book.id
    const res = await axios.post(`/api/users/cart/${userId}`, {
      bookId,
      quantity
    })
    const data = res.data
    console.log('IN THE THUNK => ', data)
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.book]
    default:
      return state
  }
}

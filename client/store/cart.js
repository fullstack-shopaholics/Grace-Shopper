import axios from 'axios'

const initialState = []

export const GET_CART = 'GET_CART'
export const GET_GUEST_CART = 'GET_GUEST_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addToCart = book => ({
  type: ADD_TO_CART,
  book
})

export const deleteItemFromCart = bookId => ({
  type: DELETE_ITEM_FROM_CART,
  bookId
})

export const changeQuantity = cartItem => ({
  type: CHANGE_QUANTITY,
  cartItem
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

export const getGuestCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/cart/guest`)
    const cart = res.data
    dispatch(getCart(cart))
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
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToGuestCart = (book, quantity) => async dispatch => {
  try {
    const bookId = book.id
    const res = await axios.post(`/api/users/cart/guest`, {
      bookId,
      quantity
    })
    const data = res.data
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = (bookId, userId) => {
  return async dispatch => {
    await axios.delete(`/api/users/cart/${userId}`, {data: {bookId}})
    dispatch(deleteItemFromCart(bookId))
  }
}

export const deleteFromGuestCart = bookId => {
  return async dispatch => {
    await axios.delete('/api/users/cart/guest', {data: {bookId}})
    dispatch(deleteItemFromCart(bookId))
  }
}

export const editQuantity = (userId, bookId, quantity) => {
  return async dispatch => {
    const result = await axios.put(`/api/users/cart/${userId}/changeQuantity`, {
      bookId,
      quantity
    })
    const updatedBook = result.data
    dispatch(changeQuantity(updatedBook))
  }
}

export const editGuestQuantity = (bookId, quantity) => {
  return async dispatch => {
    const result = await axios.put(`/api/users/cart/guest/changeQuantity`, {
      bookId,
      quantity
    })
    const updatedBook = result.data
    dispatch(changeQuantity(updatedBook))
  }
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.book]
    case DELETE_ITEM_FROM_CART:
      return state.filter(item => item.book.id !== action.bookId)
    case CHANGE_QUANTITY:
      return state.map(item => {
        if (item.book.id === action.cartItem.book.id)
          return {...item, quantity: action.cartItem.quantity}
        else return item
      })
    default:
      return state
  }
}

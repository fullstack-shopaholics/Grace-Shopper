import axios from 'axios'

const initialState = []

const ADD_ORDER = 'ADD_ORDER'

export const addOrder = order => {
  return {
    type: ADD_ORDER,
    order
  }
}

export const submitOrder = (address, cart, userId) => {
  return async dispatch => {
    const result = await axios.post(`api/users/cart/checkout`, {
      address,
      cart,
      userId
    })
    const newOrder = result.data
    dispatch(addOrder(newOrder))
  }
}

const orderFilter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}

export default orderFilter

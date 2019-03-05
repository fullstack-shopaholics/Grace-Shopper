import axios from 'axios'

const initialState = []

const ADD_ORDER = 'ADD_ORDER'
const GET_ORDERS = 'GET_ORDERS'

export const addOrder = order => {
  return {
    type: ADD_ORDER,
    order
  }
}

export const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const submitOrder = (address, cart, email, history, userId) => {
  return async dispatch => {
    const result = await axios.post(`api/users/cart/checkout`, {
      address,
      cart,
      email,
      userId
    })
    const newOrder = result.data
    dispatch(addOrder(newOrder))
    if (userId) history.push(`order/${newOrder.id}`)
  }
}

export const getUserOrders = userId => {
  return async dispatch => {
    try {
      const result = await axios.get(`/api/orders/${userId}`)
      const orders = result.data
      dispatch(getOrders(orders))
    } catch (err) {
      console.error(err)
    }
  }
}

const orderFilter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order]
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orderFilter

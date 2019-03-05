import axios from 'axios'

const initialState = []

//ACTION TYPES
const SET_ALL_ORDERS = 'SET_ALL_ORDERS'
import {UPDATE_ORDER_STATUS} from './singleOrder'

//ACTION CREATORS
const setAllOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})

//THUNK CREATORS
export const getAllOrders = filter => async dispatch => {
  try {
    const res = await axios.get('/api/orders/', {params: {filter}})
    const orders = res.data
    dispatch(setAllOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export const allOrders = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders
    case UPDATE_ORDER_STATUS:
      return state.map(
        order =>
          order.id !== action.orderId
            ? order
            : {...order, status: action.status}
      )
    default:
      return state
  }
}

export default allOrders

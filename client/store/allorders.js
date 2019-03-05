import axios from 'axios'

const initialState = []

//ACTION TYPES
const SET_ALL_ORDERS = 'SET_ALL_ORDERS'

//ACTION CREATORS
const setAllOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})

//THUNK CREATORS
export const getAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/')
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
    default:
      return state
  }
}

export default allOrders

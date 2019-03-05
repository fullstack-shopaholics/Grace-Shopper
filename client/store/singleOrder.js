import axios from 'axios'

const initialState = {}

//ACTION TYPES
const GET_ORDER = 'GET_ORDER'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

//ACTION CREATORS
export const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

const updateOrderStatus = (orderId, status) => ({
  type: UPDATE_ORDER_STATUS,
  orderId,
  status
})

//THUNK CREATORS
export const fetchOrder = (userId, orderId) => {
  return async dispatch => {
    const result = await axios.get(
      `/api/orders/${userId}/singleOrder/${orderId}`
    )
    const order = result.data
    dispatch(getOrder(order))
  }
}

export const editOrderStatus = (id, status) => async dispatch => {
  try {
    await axios.put('/api/orders/updateStatus', {id, status})
    dispatch(updateOrderStatus(id, status))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case UPDATE_ORDER_STATUS:
      return {...state, status: action.status}
    default:
      return state
  }
}

export default singleOrderReducer

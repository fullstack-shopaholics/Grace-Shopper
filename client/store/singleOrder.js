import axios from 'axios'

const initialState = {}

const GET_ORDER = 'GET_ORDER'

export const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

export const fetchOrder = (userId, orderId) => {
  return async dispatch => {
    const result = await axios.get(
      `/api/orders/${userId}/singleOrder/${orderId}`
    )
    const order = result.data
    dispatch(getOrder(order))
  }
}

const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

export default singleOrderReducer

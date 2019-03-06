import axios from 'axios'

export const SET_TOTAL = 'SET_TOTAL'

export const setTotal = total => ({
  type: SET_TOTAL,
  total
})

export const getTotal = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/books')
    dispatch(setTotal(data))
  } catch (err) {
    console.error(err)
  }
}

export const total = (state = 0, action) => {
  switch (action.type) {
    case SET_TOTAL:
      return action.total
    default:
      return state
  }
}

import axios from 'axios'

//ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

//THUNK CREATORS
export const fetchAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    const users = res.data
    dispatch(getAllUsers(users))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}

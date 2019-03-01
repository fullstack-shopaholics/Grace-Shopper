import axios from 'axios'
import {Next} from 'react-bootstrap/PageItem'

//ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_ADMIN_STATUS = 'UPDATE_ADMIN_STATUS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const updateAdminStatus = (id, isAdmin) => ({
  type: UPDATE_ADMIN_STATUS,
  isAdmin,
  id
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

export const toggleAdmin = (id, isAdmin) => async dispatch => {
  try {
    console.log('WHAT IS ADMIN HERE', {isAdmin})
    await axios.put(`/api/users/${id}/toggleAdmin`, {isAdmin})
    dispatch(updateAdminStatus(id, isAdmin))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case UPDATE_ADMIN_STATUS:
      return state.map(
        user =>
          user.id !== action.id ? user : {...user, isAdmin: action.isAdmin}
      )
    default:
      return state
  }
}

import axios from 'axios'

//ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_ADMIN_STATUS = 'UPDATE_ADMIN_STATUS'
const UPDATE_FORCE_PW_RESET = 'UPDATE_FORCE_PW_RESET'
const REMOVE_USER_FROM_ARRAY = 'REMOVE_USER_FROM_ARRAY'

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

const removeUser = id => ({
  type: REMOVE_USER_FROM_ARRAY,
  id
})

const updateForcePWReset = (id, forcePWReset) => ({
  type: UPDATE_FORCE_PW_RESET,
  id,
  forcePWReset
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
    await axios.put(`/api/users/${id}/toggleAdmin`, {isAdmin})
    dispatch(updateAdminStatus(id, isAdmin))
  } catch (err) {
    console.error(err)
  }
}

export const toggleForcePWReset = (id, forcePWReset) => async dispatch => {
  try {
    await axios.put(`/api/users/${id}/forcePWReset`, {forcePWReset})
    dispatch(updateForcePWReset(id, forcePWReset))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(removeUser(id))
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
    case UPDATE_FORCE_PW_RESET:
      return state.map(
        user =>
          user.id !== action.id
            ? user
            : {...user, forcePWReset: action.forcePWReset}
      )
    case REMOVE_USER_FROM_ARRAY:
      return state.filter(user => user.id !== action.id)
    default:
      return state
  }
}

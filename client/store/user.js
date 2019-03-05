import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_SELF = 'UPDATE_SELF'

/**
 * INITIAL STATE
 */
const defaultUser = {isGuest: true}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateSelf = user => ({type: UPDATE_SELF, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  firstName,
  lastName,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
      isGuest: false
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const putSelf = user => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/userInfo`, user)
    const returnedUser = res.data
    dispatch(updateSelf(returnedUser))
  } catch (err) {
    console.error(err)
  }
}

export const resetPassword = (id, password) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${id}/password`, {password})
    const returnedUser = res.data
    dispatch(updateSelf(returnedUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_SELF:
      return action.user
    default:
      return state
  }
}

//SELECTOR
export const makeDisplayName = (firstName, email) => {
  if (firstName === '' || !firstName) return email
  else return firstName
}

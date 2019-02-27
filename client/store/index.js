import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsers from './allusers'
import {books} from './book'
import {singleBook} from './singleBook'
import filterCategories from './filters'
import {getCategories} from './category'

const reducer = combineReducers({
  user,
  allUsers,
  books,
  singleBook,
  filterCategories,
  getCategories
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

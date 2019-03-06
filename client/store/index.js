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
import {cart} from './cart'
import currentOrders from './userOrders'
import singleOrder from './singleOrder'
import allOrders from './allorders'
import {total} from './total'

const reducer = combineReducers({
  user,
  allUsers,
  books,
  cart,
  singleBook,
  filterCategories,
  getCategories,
  currentOrders,
  singleOrder,
  allOrders,
  total
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

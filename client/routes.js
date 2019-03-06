import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllUsers,
  AllBooks,
  SingleBook,
  AddBook,
  UpdateBook,
  Cart,
  Checkout,
  ResetPassword,
  ForcePWResetPage,
  SingleOrder,
  DisplayPastOrders,
  AllOrdersView,
  OrderRedirect,
  AddCategory
} from './components'
import {me} from './store'
import {fetchBooks} from './store/book'
import UpdateSelf from './components/UpdateSelf'
import {getTotal} from './store/total'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadBooks()
    this.props.getTotal()
  }

  render() {
    const {isLoggedIn, isAdmin, forcePWReset} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {forcePWReset && <Route component={ForcePWResetPage} />}
        <Route exact path="/books" component={AllBooks} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/guest/cart" component={Cart} />{' '}
        <Route path="/checkout" component={Checkout} />{' '}
        <Route path="/order/confirm" component={OrderRedirect} />{' '}
        {/*Make so only the logged in user can see their cart & hide guest when logged in*/}
        <Route path="/user/:userId/cart" component={Cart} />
        {isAdmin && <Route path="/users" component={AllUsers} />}
        {isAdmin && <Route exact path="/books/add" component={AddBook} />}
        {isAdmin && (
          <Route exact path="/categories/add" component={AddCategory} />
        )}
        {isAdmin && (
          <Route exact path="/books/:id/update" component={UpdateBook} />
        )}
        {isAdmin && <Route path="/orders" component={AllOrdersView} />}
        <Route path="/books/:id" component={SingleBook} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/order/:orderId" component={SingleOrder} />
            <Route path="/home" component={UserHome} />
            <Route path="/profile/update" component={UpdateSelf} />
            <Route path="/profile/resetPassword" component={ResetPassword} />
            <Route path="/profile/orders" component={DisplayPastOrders} />
            {/* Displays user home as default when signed in */}
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    forcePWReset: state.user.forcePWReset,
    singleBook: state.singleBook
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadBooks() {
      dispatch(fetchBooks())
    },
    getTotal() {
      dispatch(getTotal())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

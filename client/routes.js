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
  Cart
} from './components'
import {me} from './store'
import {fetchBooks} from './store/book'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadBooks()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/books" component={AllBooks} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/guest/cart" component={Cart} />{' '}
        {/*Make so only the logged in user can see their cart & hide guest when logged in*/}
        <Route path="/user/:userId/cart" component={Cart} />
        {isAdmin && <Route path="/users" component={AllUsers} />}
        {isAdmin && <Route exact path="/books/add" component={AddBook} />}
        {isAdmin && (
          <Route exact path="/books/:id/update" component={UpdateBook} />
        )}
        <Route path="/books/:id" component={SingleBook} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
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

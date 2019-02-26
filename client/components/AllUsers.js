import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allusers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    return (
      <div>
        {this.props.users &&
          this.props.users.map(user => <div key={user.id}>{user.email}</div>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)

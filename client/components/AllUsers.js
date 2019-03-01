import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allusers'
import {Card, CardDeck} from 'react-bootstrap'
import ToggleAdminButton from './ToggleAdminButton'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  shouldComponentUpdate

  render() {
    return (
      <div>
        <CardDeck>
          {this.props.users &&
            this.props.users.map(user => (
              <div key={user.id}>
                <Card className="userCard">
                  <Card.Body>
                    <Card.Title style={{marginBottom: 0}}>
                      {user.email}
                      {user.isAdmin && (
                        <span style={{float: 'right', fontSize: '0.8rem'}}>
                          admin
                        </span>
                      )}
                    </Card.Title>
                    {user.firstName || user.lastName ? (
                      <Card.Subtitle>
                        {user.firstName && <span>{`${user.firstName} `}</span>}{' '}
                        {user.lastName && <span>{`${user.lastName}`}</span>}
                      </Card.Subtitle>
                    ) : (
                      <Card.Subtitle>
                        <br />
                      </Card.Subtitle>
                    )}
                    <ToggleAdminButton id={user.id} isAdmin={user.isAdmin} />
                  </Card.Body>
                </Card>
                <br />
              </div>
            ))}
        </CardDeck>
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

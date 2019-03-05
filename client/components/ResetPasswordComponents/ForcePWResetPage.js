import React from 'react'
import ResetPassword from './ResetPassword'
import {withRouter} from 'react-router-dom'

export const ForcePWResetPage = props => {
  return (
    <div>
      <h3>Reset your password before continuing</h3>
      <ResetPassword history={props.history} />
    </div>
  )
}

export default withRouter(ForcePWResetPage)

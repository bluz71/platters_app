import axios from 'axios'
import { API_HOST } from '../config'
import { appAuth } from '../lib/appAuth'
import { toastAlert, toastNotice } from '../helpers/toastMessage'

const UserConfirmation = props => {
  if (appAuth.isLoggedIn()) {
    appAuth.logOut()
  }

  /* eslint-disable camelcase */
  const { user, confirmation_token } = props.match.params
  const confirmEmailEndPoint = `${API_HOST}/api/confirm_email/${user}/${confirmation_token}`
  axios
    .get(confirmEmailEndPoint)
    .then(response => {
      appAuth.logIn(response.data.auth_token)
      props.history.push('/')
      toastNotice(
        `Welcome ${
          appAuth.currentUser().name
        }, you have now completed the sign up process`
      )
    })
    .catch(error => {
      props.history.push('/')
      if (error.response && error.response.status === 406) {
        toastAlert('Email confirmation details are invalid')
      } else {
        toastAlert('Server error, please try again later')
      }
    })
  /* eslint-disable camelcase */

  return null
}

export default UserConfirmation

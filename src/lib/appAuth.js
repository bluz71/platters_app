import decode from 'jwt-decode'
import axios from 'axios'
import { API_HOST } from '../config'
import { toastAlert } from '../helpers/toastMessage'
import { waitTimeout } from '../helpers/waitTimeout'

const AUTH_TOKEN_KEY = 'platters_auth_token'
const TOKEN_ENDPOINT = `${API_HOST}/api/tokens/new`

class AppAuth {
  constructor () {
    // The encoded authenication token, in JWT format, as provided by the
    // server and stored by the browser.
    this.authToken = null
    // The decoded user identification token.
    this.idToken = null
    // Is a token refresh pending from the server?
    this.refreshPending = false
  }

  logIn (authToken) {
    try {
      this.idToken = decode(authToken)
    } catch (err) {
      err.tokenMessage = 'Invalid server authentication token'
      throw err
    }
    this.authToken = authToken
    localStorage.setItem(AUTH_TOKEN_KEY, authToken)
  }

  logOut () {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    this.authToken = null
    this.idToken = null
  }

  currentUser () {
    this._token()

    return this.idToken
  }

  isLoggedIn () {
    this._token()
    this._refreshToken()

    return !!this.idToken && this._isValid()
  }

  async headers () {
    this._token()

    if (!this.idToken || !this._isValid()) {
      return
    }

    // Pause, for a small while, if a token refresh is in-progress.
    // Try for up to 5 seconds.
    let i = 0
    while (i < 50 && this.refreshPending) {
      await waitTimeout(100)
      i++
    }

    return {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    }
  }

  // Private functions.

  _token () {
    if (this.idToken) {
      return
    }

    const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
    if (authToken) {
      this.authToken = authToken
      this.idToken = decode(authToken)
    }
  }

  _refreshToken () {
    if (!this.idToken) {
      return
    }

    const currentTime = Date.now() / 1000 // From milliseconds to seconds.
    if (currentTime + 90 > this.idToken.refreshExp) {
      // The refresh period has expired or is about to expire, hence clear the
      // current session.
      this.logOut()
      toastAlert('Session has expired, please login again')
      return
    }
    if (currentTime + 90 > this.idToken.exp) {
      // Current token has either expired or is about to expire, hence obtain a
      // new token from the server.
      this._getNewToken()
    }
  }

  _getNewToken () {
    if (this.refreshPending) {
      return
    }
    this.refreshPending = true
    axios
      .get(TOKEN_ENDPOINT, {
        headers: { Authorization: `Bearer ${this.authToken}` }
      })
      .then(response => {
        this.refreshPending = false
        this.logIn(response.data.auth_token)
      })
      .catch(error => {
        this.refreshPending = false
        if (error.response && error.response.status === 401) {
          // Server rejected the refresh request, hence we should scrub all
          // cached details and force the user to do a full username/password
          // login.
          this.logOut()
          toastAlert('Server requested verification, please login again')
        } else if (error.response && error.response.status === 400) {
          // It is likely that the refresh period has expired. Logout the user.
          this.logOut()
        } else {
          toastAlert('Server error, please try again later')
        }
      })
  }

  _isValid () {
    if (!this.idToken) {
      return false
    }

    // Validates the payload for expiration and claims.
    if (
      this.idToken.iss !== 'platters' ||
      this.idToken.aud !== 'platters_app' ||
      (!this.refreshPending && this.idToken.exp < Date.now() / 1000)
    ) {
      return false
    } else {
      return true
    }
  }
}

export const appAuth = new AppAuth()

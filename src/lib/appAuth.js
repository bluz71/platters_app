import decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'platters_auth_token';

class AppAuth {
  constructor() {
    // The encoded authenication token, in JWT format, as provided by the
    // server and stored by the browser.
    this.authToken = null;
    // The decoded user identification token.
    this.idToken = null;
  }

  logIn(authToken) {
    try {
      this.idToken = decode(authToken);
    }
    catch (err) {
      err.tokenMessage = 'Invalid server authentication token';
      throw err;
    }
    this.authToken = authToken;
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  }

  logOut() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.authToken = null;
    this.idToken   = null;
  }

  currentUser() {
    this._getToken();

    return this.idToken;
  }

  isLoggedIn() {
    this._getToken();

    return !!this.idToken && this._isValid();
  }

  headers() {
    this._getToken();

    if (!this.idToken || !this._isValid()) {
      return;
    }

    return {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    };
  }

  // Private functions.

  _getToken() {
    if (this.idToken) {
      return;
    }

    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      this.authToken = authToken;
      this.idToken = decode(authToken);
    }
  }

  _isValid() {
    if (!this.idToken) {
      return false;
    }

    // Validates the payload for expiration and claims.
    if (
      this.idToken.exp < Date.now() / 1000 ||
      this.idToken.iss !== 'platters' ||
      this.idToken.aud !== 'platters_app'
    ) {
      return false;
    }
    else {
      return true;
    }
  }
}

export const appAuth = new AppAuth();

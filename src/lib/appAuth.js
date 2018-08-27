import decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';

class AppAuth {
  constructor() {
    this.idToken = null;
  }

  logIn(authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    this.idToken = decode(authToken);
    console.log(this.idToken);
  }

  logOut() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.idToken = null;
  }

  isLoggedIn() {
    this.getToken();

    return !!this.idToken;
  }

  currentUser() {
    this.getToken();

    return this.idToken;
  }

  getToken() {
    if (this.idToken) {
      return;
    }

    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      this.idToken = decode(authToken);
    }
  }
}

export const appAuth = new AppAuth();

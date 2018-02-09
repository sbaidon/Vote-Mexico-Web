// src/Auth/AuthService.js

import auth0 from 'auth0-js';
import EventEmitter from 'EventEmitter';
import router from './../router';

export default class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.authNotifier = new EventEmitter();
    this.auth0 = new auth0.WebAuth({
      domain: 'sergiobaidon.auth0.com',
      clientID: '5bfKGsVmFypbb0ViX1THnbGdVa5n8LT9',
      redirectUri: 'http://localhost:8081/callback',
      audience: 'https://vote.mexico/api/v2',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.authNotifier.emit('error', { authenticated: false });
      }
    });
  }

  setSession({ accessToken, expiresIn, idToken }) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.authNotifier.emit('authChange', { authenticated: true });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    this.authNotifier.emit('authChange', false);
    // navigate to the home route
    router.replace('home');
  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["isAuthenticated"] }] */
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

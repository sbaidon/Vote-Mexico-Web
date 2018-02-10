import auth0 from 'auth0-js';

export default {
  auth0: new auth0.WebAuth({
    domain: 'sergiobaidon.auth0.com',
    clientID: '5bfKGsVmFypbb0ViX1THnbGdVa5n8LT9',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://vote.mexico/api/v2',
    responseType: 'token id_token',
    scope: 'openid profile'
  }),

  login() {
    this.auth0.authorize();
  },

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          return resolve({ authenticated: true });
        }
        reject({ authenticated: false, err });
      });
    });
  },

  setSession({ accessToken, expiresIn, idToken }) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
  },

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  },
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["isAuthenticated"] }] */
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
};

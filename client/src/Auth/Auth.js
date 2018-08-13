import auth0 from 'auth0-js';
import Routes from "../routes";

// ...
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'mural-mates.auth0.com',
    clientID: 'G16YKhhHHB2zFSixBS9L0gp9najKLqDH',
    redirectUri: this.getCallbackRoute(),
    audience: 'https://mural-mates.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });


  // ...
  constructor(history) {
    this.history = history;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile;

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
    }
    return accessToken;
  }
  // 
  getCallbackRoute() {
    if (window.location.href.indexOf("localhost") != -1) {
      return "http://localhost:3000/callback";
    } else {
      return window.location.href + "callback";
    }
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }


  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.replace('/');
      } else if (err) {
        this.history.replace('/');
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    this.history.replace('/');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    this.history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
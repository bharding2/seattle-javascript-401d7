var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: DONE explain what each of these functions are accomplishing and
    // what data we're storing in this service
    //
    // data stored in this service: this.token (auth token returned from api via our sign in and sign up controllers) and this.username (username of current authenticated user via the auth controller)
    //
    // removeToken:  strips the token from all of the various places we have stored it on the clientside.  Essentially a logout function
    //
    // saveToken: Take a token and saves it in the various places we need it on the clientside.  Essentially a 'stay logged in' function.
    //
    // getToken: Returns a token.  If a token already exists on the auth service, returns the token.  Otherwise checks localStorage for a token, saves that token using saveToken, and then returns the newly saved token.
    //
    // getUsername: returns the promisified result of a GET request to the /api/profile route from our api.  That route's current sole function is to authenticate the user using the jwt_auth middleware and then return a username.

    return {
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};

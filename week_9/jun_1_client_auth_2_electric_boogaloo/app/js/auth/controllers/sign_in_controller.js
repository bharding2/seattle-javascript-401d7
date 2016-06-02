var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: DONE how does this differ from the sign_up_controller?
    //
    // The real difference lies in the authenticate functions.  Sign in sends a GET request to /api/signin after attaching a header of the username and password encoded into a base64 string.  Sign up simply sends a POST request to create a new user.  Both save the returned token, get the current username, and redirect to /bears

    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'could not sign into user'));
    };
  }]);
};

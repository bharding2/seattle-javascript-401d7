var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: DONE how does this differ from the sign_in_controller
    //
    // The real difference lies in the authenticate functions.  Sign up simply sends a POST request to create a new user.  Sign in sends a GET request to /api/signin after attaching a header of the username and password encoded into a base64 string.  Both save the returned token, get the current username, and redirect to /bears

    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};

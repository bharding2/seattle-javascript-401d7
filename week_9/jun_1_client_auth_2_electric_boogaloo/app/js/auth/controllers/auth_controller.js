module.exports = function(app) {
  app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      // AUTH_EXP: DONE What happens when this function is called?
      //
      // tldr: Finds the username of the current user and binds it to our controller's scope as the property .username
      //
      // This function calls the getUsername that is declared in the cfAuth service (auth_service.js).  The cfAuth.getUsername function returns a promisified result of an http GET request to the route /api/profile from our backend.  The api/profile route runs through our jwt_auth middleware to find and verify the current user from our database and attaches that user to the request object.  After the middleware, the route returns the username of that user.  The promise in the service's function resolves with a username as its parameter.  When we call .then, we grab that username and set it as a property on our controller's scope as whateverController.username.

      auth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};

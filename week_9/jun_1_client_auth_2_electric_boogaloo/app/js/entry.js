const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: DONE how do the signin/up routes differ and what is their relationship
    // with one another
    //
    // The way we have things set up, they are pretty well linked, and in fact share a single view.  When their routes are hit, they both instantiate their respective signin and signup controllers as 'authctrl' which then dictates the functionality of the form we have built in the  auth_view.html template.  This is possible because they both have an identically named 'authenticate' function that does different things when the form is submitted.  They also have different values for buttonText to avoid confusion.  In our auth_view, we have some fun ternary action to facilitate the single view and to switch between the two.  Is it necessary to do it this way?  Probably not, but I think it was a fun way to handle the logic of two vary small pieces of the front end that are very very similar in one template.

    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);

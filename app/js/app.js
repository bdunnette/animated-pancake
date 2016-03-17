'use strict';

// Declare app level module which depends on views, and components
angular.module('vscope', [
  'ngRoute',
  'vscope.view1',
  'vscope.view2',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
run(function($rootScope, cornercouch){
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
});

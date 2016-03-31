'use strict';

// Declare app level module which depends on views, and components
angular.module('vscope', [
  'ngRoute',
  'vscope.slideList',
  'vscope.slideView',
  'CornerCouch',
  'ui-leaflet'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]).
run(function($rootScope, cornercouch) {
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
});

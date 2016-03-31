'use strict';

angular.module('vscope.slideView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/slide/:slideId', {
    templateUrl: 'slide/view/slide_view.html',
    controller: 'SlideViewCtrl'
  });
}])

.controller('SlideViewCtrl', ['$rootScope', '$scope', '$routeParams', 'cornercouch', function($rootScope, $scope, routeParams, cornercouch) {

}]);

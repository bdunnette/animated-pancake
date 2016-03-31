'use strict';

angular.module('vscope.slideList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'slide/list/slide_list.html',
    controller: 'SlideListCtrl'
  });
}])

.controller('SlideListCtrl', ['$rootScope', '$scope', 'cornercouch', function($rootScope, $scope, cornercouch) {
  $scope.db = $rootScope.couch.getDB('test');
  $scope.newSlide = $scope.db.newDoc({
    type: 'slide'
  });

  $scope.db.query("vscope", "slides", {
    include_docs: true
  });

  $scope.submitEntry = function() {
    var now = new Date();
    var now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    $scope.newentry.utc = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');

    $scope.newentry.save().success(function() {
      delete $scope.errordata;
      $scope.detail = $scope.newentry;
      $scope.newSlide = $scope.db.newDoc({
        type: 'slide'
      });
      $scope.db.query("vscope", "slides", {
        include_docs: true
      });
    });
  };
}]);

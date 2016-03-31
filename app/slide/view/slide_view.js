'use strict';

angular.module('vscope.slideView', ['ngRoute', 'ui-leaflet'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/slide/:slideId', {
    templateUrl: 'slide/view/slide_view.html',
    controller: 'SlideViewCtrl'
  });
}])

.controller('SlideViewCtrl', ['$rootScope', '$scope', '$routeParams', 'cornercouch', function($rootScope, $scope, $routeParams, cornercouch) {
  $scope.contributors = ['University of Minnesota'];
  angular.extend($scope, {
    slideCenter: {
      lat: 0,
      lng: 0,
      zoom: 2
    },
    defaults: {
      maxZoom: 8,
      noWrap: true,
      continuousWorld: false
    },
    contributors: [],
    tiles: {
      url: '',
      options: {
        continuousWorld: false,
        noWrap: true,
        attribution: 'Images &copy; 2016 ' + $scope.contributors
      }
    },
    controls: {
      fullscreen: {
        position: 'topleft'
      }
    }

  });
  $scope.db = $rootScope.couch.getDB('test');
  var slideDoc = $scope.db.newDoc();
  slideDoc.load($routeParams.slideId)
    .success(function(slide) {
      console.log(slide);
      $scope.slide = slide;
      $scope.tiles.url = slide.tileUrl + '/{z}/{y}/{x}.jpg';
      console.log($scope.tiles);
    })
    .error(function(error) {
      console.error(error);
    })

}]);

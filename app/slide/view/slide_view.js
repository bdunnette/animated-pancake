'use strict';

angular.module('vscope.slideView', ['ngRoute', 'ui-leaflet'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/slide/:slideId', {
        templateUrl: 'slide/view/slide_view.html',
        controller: 'SlideViewCtrl'
    });
}])

.controller('SlideViewCtrl', ['$rootScope', '$scope', '$routeParams', 'cornercouch', 'leafletDrawEvents', function($rootScope, $scope, $routeParams, cornercouch, leafletDrawEvents) {
    $scope.contributors = ['University of Minnesota'];
    var drawnItems = new L.FeatureGroup();
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
        },
        drawOptions: {
            // position: "bottomright",
            draw: {
                polyline: false,
                polygon: false,
                circle: {
                    showArea: false,
                    shapeOptions: {
                        color: 'blue'
                    }
                },
                rectangle: {
                    showArea: false,
                    shapeOptions: {
                        color: 'lime'
                    }
                }
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        }

    });

    $scope.db = $rootScope.couch.getDB('test');

    var slideDoc = $scope.db.newDoc();

    slideDoc.load($routeParams.slideId)
        .success(function(slide) {
            console.log(slide);
            console.log(slide.annotations);
            var myLayer = L.geoJson().addTo(drawnItems);
            myLayer.addData(slide.annotations);
            $scope.slide = slide;
            $scope.tiles.url = slide.tileUrl + '/{z}/{y}/{x}.jpg';
            console.log($scope.tiles);
        })
        .error(function(error) {
            console.error(error);
        })

    var handle = {
        created: function(e, leafletEvent, leafletObject, model, modelName) {
            // console.log(leafletEvent);
            // console.log(leafletEvent.layer);
            // var type = leafletEvent.layerType;
            var layer = leafletEvent.layer;
            var shape = layer.toGeoJSON()
                // var shape_for_db = JSON.stringify(shape);
                // console.log(shape_for_db);
            $scope.slide.annotations.push(shape);
            console.log($scope.slide.annotations);
            drawnItems.addLayer(leafletEvent.layer);
        },
        edited: function(arg) {},
        deleted: function(arg) {
            var layers;
            layers = arg.layers;
            drawnItems.removeLayer(layer);
        },
        drawstart: function(arg) {},
        drawstop: function(arg) {},
        editstart: function(arg) {},
        editstop: function(arg) {},
        deletestart: function(arg) {},
        deletestop: function(arg) {}
    };

    var drawEvents = leafletDrawEvents.getAvailableEvents();
    // console.log(drawEvents);

    drawEvents.forEach(function(eventName) {
        $scope.$on('leafletDirectiveDraw.' + eventName, function(e, payload) {
            //{leafletEvent, leafletObject, model, modelName} = payload
            var leafletEvent, leafletObject, model, modelName; //destructuring not supported by chrome yet :(
            leafletEvent = payload.leafletEvent, leafletObject = payload.leafletObject, model = payload.model,
                modelName = payload.modelName;
            handle[eventName.replace('draw:', '')](e, leafletEvent, leafletObject, model, modelName);
        });
    });
}]);
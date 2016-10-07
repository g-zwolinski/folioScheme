'use strict';

angular.module('folioApp', [
  'folioApp.auth',
  'folioApp.admin',
  'folioApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'duScroll',
  'ngAnimate',
  'swipe',
  'ngAria',
  'ngMaterial',
  'ngMessages'
])
  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    
    var background = $mdThemingProvider.extendPalette('grey', {
      'A100': 'f8f8f8'
    });
    $mdThemingProvider.definePalette('background', background);
    $mdThemingProvider.theme('default').backgroundPalette('background');

    $locationProvider.html5Mode(true);
  })
  .value('duScrollOffset', 0)
  .directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': window.innerHeight, 
                'w': window.innerWidth
            };
        }, function (newValue, oldValue) {
            //console.log(newValue, oldValue);
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return { 
                    'height': (newValue.h - offsetH) + 'px'                    
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
  });

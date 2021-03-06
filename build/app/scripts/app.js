'use strict';

/**
 * @ngdoc overview
 * @name r2ui
 * @description
 * # r2ui
 *
 * Main module of the application.
 */
angular
  .module('r2ui', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.router',
    'base64',
    'angularMoment'
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider,
                    $urlMatcherFactoryProvider, $mdThemingProvider,
                    dockerRegistryProvider) {
    // Use HTML5 mode.
    $locationProvider.html5Mode(true);

    // Register custom parameter types.
    $urlMatcherFactoryProvider.type('repository', {
      encode: function (value) {
        return value !== null ? value.toString() : value;
      },
      decode: function (value) {
        return value !== null ? value.toString() : value;
      },
      is: function (value) {
        return /.*/.test(value);
      }
    });

    // Configure the states.
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          menu: {
            templateUrl: 'views/repositories.html',
            controller: 'RepositoriesCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.repository', {
        url: 'repositories/{name:repository}',
        views: {
          'content@': {
            templateUrl: 'views/repository.html',
            controller: 'RepositoryCtrl',
            controllerAs: 'vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/');

    // Set up the theme.
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('orange');

    // Set up Docker Registry.
    dockerRegistryProvider.setUsername("");
    dockerRegistryProvider.setPassword("");
    dockerRegistryProvider.setRegistryUrl(window.location.origin);
  });

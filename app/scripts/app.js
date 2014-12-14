'use strict';

/**
 * @ngdoc overview
 * @name surveyApp
 * @description
 * # surveyApp
 *
 * Main module of the application.
 */
angular
  .module('surveyApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'checklist-model',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function ($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

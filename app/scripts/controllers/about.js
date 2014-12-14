'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

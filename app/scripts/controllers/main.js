'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

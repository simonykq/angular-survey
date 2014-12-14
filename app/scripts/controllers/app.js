'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:AppCtrlCtrl
 * @description
 * # AppCtrlCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('AppCtrl', function ($scope) {
    $scope.surveys = [
      {
        title: 'Survey one',
        description: 'Survey one desciption',
        fields: [
          {question: 'What is your name?', type: 'text', required: true},
          {question: 'What is your lucky number', type: 'number', required: true, maxlength: 100, minlength: 1},
          {question: 'When is your birthday?', type: 'date', required: true},
          {question: 'Who is your friend?', type: 'select', required: true , options: [{text: 'simon'}, {text: 'james'}, {text: 'chris'}, {text:'oliver'}]}
        ]
      }
    ];
  });

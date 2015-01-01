'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyComponent
 * @description
 * # surveyComponent
 */
angular.module('surveyApp')
  .directive('surveyComponents', function () {
    return {
      templateUrl: 'views/_survey_components.html',
      restrict: 'E',
      controller: function($scope){

        $scope.submitForm = function(form, survey, result){
          if(form.$valid){
            //submit the survey with result to remote
            form.$setPristine();
            prestineResult(result);
            alert('Submited!');
          }else{
            //TODO: set all nested fields in this form to $dirty state
            form.$setDirty();
          }
        };

        $scope.clearForm = function(form, result){
          if(form.$dirty){
            form.$setPristine();
            prestineResult(result);
          }
        };

        function prestineResult(result){
          for (var prop in result) {
            delete result[prop];
          }
        }
      },
      scope: {
        surveys: '=components'
      }
    };
  });

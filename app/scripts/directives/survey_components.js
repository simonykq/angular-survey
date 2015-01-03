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
            prestineResult(result);
            form.$setPristine();
            //form.$rollbackViewValue();
            alert('Submited!');
          }else{
            form.$setDirty();
            dirtyNestedFields(form);
          }
        };

        $scope.clearForm = function(form, result){
          if(form.$dirty){
            prestineResult(result);
            form.$setPristine();
            //form.$rollbackViewValue();
          }
        };

        function prestineResult(result){
          for (var prop in result) {
            result[prop] = null;
          }
        }

        function dirtyNestedFields(form){
          for(var field in form){
            //check for the nested fields and controls
            var ctrl = form[field];
            if (field[0] != '$' && ctrl.$pristine) {
              ctrl.$setDirty();
            }
          }
        }
      },
      scope: {
        surveys: '=components'
      }
    };
  });

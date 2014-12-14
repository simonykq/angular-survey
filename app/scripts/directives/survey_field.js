'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyField
 * @description
 * # surveyField
 */
angular.module('surveyApp')
  .directive('surveyField', function () {
    return {
      templateUrl: '/views/_survey_field.html',
      transclude: true,
      restrict: 'E',
      scope: {
        field: '=',
        count: '@',
        copy: '&',
        delete: '&'
      },
      controllerAs: 'ctrl',
      controller: function($scope, inputTypes){

          this.field = $scope.field;

          this.inputTypes = inputTypes;

          this.copy = $scope.copy();
          this.delete = $scope.delete();

          this.isRequirable = function(type){
            return ['radio', 'checkbox', 'multi-select',''].indexOf(type) === -1;
          };

          this.isRangable = function(type){
            return ['text', 'number', 'email', 'url', 'tel', 'textarea'].indexOf(type) !== -1;
          }
      }
    };
  });

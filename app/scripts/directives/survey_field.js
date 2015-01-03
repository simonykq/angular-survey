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

          this.isValidable = function(type){
            return this.isRequirable(type) || this.isRequirable(type) || this.isNumerable(type) || this.isDatable(type);
          };

          this.isRequirable = function(type){
            return ['checkbox',''].indexOf(type) === -1;
          };

          this.isRangable = function(type){
            return ['text', 'email', 'url', 'tel', 'textarea'].indexOf(type) !== -1;
          };

          this.isNumerable = function(type){
            return ['number','range'].indexOf(type) !== -1;
          };

          this.isDatable = function(type){
            return type === 'date';
          };

          this.cleanUp = function(shouldClean, field){
            if(shouldClean){
              delete this.field[field];
            }
          };

          this.isFormDirty = function(type,prop){
              var formName;
              if(type === 'field'){
                formName = 'nestedField_' + $scope.count;
                if($scope[formName] && $scope[formName][prop]){
                  return $scope[formName][prop].$dirty;
                }else {
                  return false;
                }
              }else{
                formName = 'nestedValidation_' + $scope.count;
                if($scope[formName] && $scope[formName][prop]){
                  return $scope[formName][prop].$dirty;
                }else{
                  return false
                }
              }
          };

        this.formError = function(type,prop){
          var formName;
          if(type === 'field'){
            formName = 'nestedField_' + $scope.count;
            if($scope[formName] && $scope[formName][prop]){
              return $scope[formName][prop].$error;
            }else {
              return null;
            }
          }else{
            formName = 'nestedValidation_' + $scope.count;
            if($scope[formName] && $scope[formName][prop]){
              return $scope[formName][prop].$error;
            }else{
              return null;
            }
          }
        }

      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyFieldOptions
 * @description
 * # surveyFieldOptions
 */
angular.module('surveyApp')
  .directive('surveyFieldOptions', function () {
    return {
      templateUrl: '/views/_survey_field_options.html',
      restrict: 'E',
      require: '^^surveyField',
      scope: {},
      link: {
        pre: function(scope, element, attrs, ctrl){
          scope.field = ctrl.field;
          scope.newOption = {'text': ''};
          scope.field.options = scope.field.options || [];
        },
        post: function($scope){
          $scope.addOption = function(newOption){
            var text = newOption['text'];
            if(text && text !== '' && typeof text !== 'undefined'){
              $scope.field.options.push({'text': text});
              newOption['text'] = '';
            }
          };
          $scope.deleteOption = function(option){
            var index = $scope.field.options.indexOf(option);
            if(index !== -1){
              $scope.field.options.splice(index,1);
            }
          };
          $scope.$on('$destroy', function(){
            delete $scope.field.options
          });
        }
      }
    };
  });

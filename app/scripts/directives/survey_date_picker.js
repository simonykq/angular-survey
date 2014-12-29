'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyDatePicker
 * @description
 * # surveyDatePicker
 */
angular.module('surveyApp')
  .directive('surveyDatePicker', function ($filter) {
    return {
      templateUrl: 'views/_survey_date_picker.html',
      replace: true,
      restrict: 'E',
      scope: {
        key: '@',
        format: '@',
        options: '='
      },
      require: '?ngModel',
      controller: function($scope){
          $scope.opened = false;
          //this is only used for date component and for some reason, the pop up doesnt show without this
          $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = !$scope.opened;
          };
      },
      link: function postLink(scope, element, attrs, ctrl) {
        if(!ctrl) return;

        var ngModelCtrl = ctrl;

        ngModelCtrl.$render = function(){
           element.find('input').text(ngModelCtrl.$viewValue);
        };

        var dateFormatter = function(value){
           var format = scope.format || 'shortDate';
           return $filter('date')(format, value)
        };

        ngModelCtrl.$formatters.push(dateFormatter);


        scope.$watch('opened',function(newValue){
          var ele = element.lastChild();
          newValue ? ele.show() : ele.hide();

        });

      }
    };
  });

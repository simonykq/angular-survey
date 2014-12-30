'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyDatePicker
 * @description
 * # surveyDatePicker
 */
angular.module('surveyApp')
  .directive('surveyDatePicker', function ($filter, $parse) {
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

        var ngModelCtrl = ctrl,
            format      = scope.format || 'shortDate',
            parsed      = $parse('dateValue'),
            setter      = parsed.assign;

        scope.$watch(function(){
          return ngModelCtrl.$viewValue;
        },function(newVale){
          setter(scope, newVale);
        });
        scope.$watch('dateValue', function(newValue){
          ngModelCtrl.$setViewValue(newValue);
        });

        ngModelCtrl.$render = function(){
           var formatedDate = $filter('date')(format,ngModelCtrl.$viewValue);
           element.find('input').text(formatedDate);
        };

        attrs.$observe('format', function(value){
          format = value || 'shortDate';
          ngModelCtrl.$render();
        });

        // popup element used to display calendar
        var popupEl = angular.element('<div id="calendar-popup" datepicker-popup-wrap><div datepicker></div></div>'),
            datepickerEl = angular.element(popupEl.children()[0]);

        popupEl.attr({
          'ng-model': 'dateValue'
        });

        angular.forEach(scope.options,function(value, option){
          datepickerEl.attr( cameltoDash(option), value );
        });

        scope.$watch('opened',function(newValue){
          var ele = element.find('#calendar-popup');
          newValue ? ele.show() : ele.hide();
        });

        var $popup = $compile(popupEl)(scope);
        // Prevent jQuery cache memory leak (template is now redundant after linking)
        popupEl.remove();
        element.after($popup);

        scope.$on('$destroy', function(){
          $popup.remove();
        });

        function cameltoDash( string ){
          return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
        }
      }
    };
  });

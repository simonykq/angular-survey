'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyDatePicker
 * @description
 * # surveyDatePicker
 */
angular.module('surveyApp')
  .directive('surveyDatePicker', function ($compile, $filter, $parse) {
    return {
      templateUrl: 'views/_survey_date_picker.html',
//      replace: true,
      restrict: 'E',
      scope: {
        key: '@',
        format: '@',
        options: '='
      },
      require: '?ngModel',
      controller: function($scope, $element, $position){
          $scope.isOpen = false;
          //this is only used for date component and for some reason, the pop up doesnt show without this
          $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.isOpen = !$scope.isOpen;
          };

          $scope.$watch('isOpen',function(value){

              var ele = $element.next();
              if(value){
                  $scope.position =  $position.position($element);
                  $scope.position.top = $scope.position.top + $element.prop('offsetHeight');
                  ele.bind('click', handler);
              } else {
                  ele.unbind('click', handler);
              }
          });

          var handler = function(event){
              event.preventDefault();
              $scope.$apply(function(){
                  $scope.isOpen = false;
              });
          }
      },
      link: function postLink(scope, element, attrs, ctrl) {
        if(!ctrl) return;

        var ngModelCtrl = ctrl,
            format      = scope.format || 'shortDate';

        scope.$watch('dateValue', function(newValue, oldValue){
            if(newValue === oldValue) return;
            console.log('datavalue changed');
            ngModelCtrl.$setViewValue(newValue);
            ngModelCtrl.$render();
        });

        element.find('input').keyup(function(e){
            e.preventDefault();
            var $this = $(this);
            scope.$apply(function(){
                  ngModelCtrl.$setViewValue($this.val());
                  ngModelCtrl.$setDirty();
            });
        });

        ngModelCtrl.$render = function(){
            var viewValue = ngModelCtrl.$viewValue,
                formatedDate = $filter('date')(viewValue, format);
            element.find('input').val(formatedDate);
        };

        var dateValidator = function(value){
          if(angular.isDate(value) || value === ''){
            ngModelCtrl.$setValidity('date', true);
            return value;
          }else{
            ngModelCtrl.$setValidity('date', false);
            return undefined;
          }
        };

        ngModelCtrl.$parsers.push(dateValidator);
        ngModelCtrl.$formatters.unshift(dateValidator);


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

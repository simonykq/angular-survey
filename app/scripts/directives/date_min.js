'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:dateMin
 * @description
 * # dateMin
 */
angular.module('surveyApp')
  .directive('dateMin', function () {
    return {
      restrict: 'A',
      require: ['?ngModel'],
      link: function postLink(scope, element, attrs, ctrls) {
        if(!ctrls[0]) return;

        var ngModel = ctrls[0];
        ngModel.$validators.mindate = function(modelValue){
          if(modelValue === '') return true;  //allow empty string to be valid

          var value      = scope.$eval(attrs.dateMin),
              date       = new Date(value),
              modelDate  = new Date(modelValue);

          if(+date < +modelDate){
            return true;
          }else{
            return false;
          }
        };

        attrs.$observe('dateMin', function(){
          ngModel.$validate();
        });
      }
    };
  });

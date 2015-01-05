'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:dateMax
 * @description
 * # dateMax
 */
angular.module('surveyApp')
  .directive('dateMax', function () {
    return {
      restrict: 'A',
      require: ['?ngModel'],
      link: function postLink(scope, element, attrs, ctrls) {
        if(!ctrls[0]) return;

        var dateMax = scope.$eval(attrs.dateMax);

        if(!dateMax){
          return;
        }else{
          var ngModel = ctrls[0];
          ngModel.$validators.maxdate = function(modelValue){
            var value      = dateMax,
                date       = new Date(value),
                modelDate  = new Date(modelValue);

            if(+date > +modelDate){
              return true;
            }else{
              return false;
            }
          };

          attrs.$observe('dateMax', function(){
            ngModel.$validate();
          });
        }
      }
    };
  });

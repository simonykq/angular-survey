'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyInputs
 * @description
 * # surveyInputs
 */

var DIRECTIVE_TYPES = [
  'checkbox',
  'date',
  'datetime',
  'day',
  'month',
  'multi-select',
  'radio',
  'select',
  'textarea',
  'time',
  'week'
];
var module = angular.module('surveyApp');

module
  .directive('surveyInput', function ($compile, $parse, inputTypes) {

    return {
      restrict: 'E',
      scope: {
        field: '=',
        result: '=binding',
        key: '@'
      },
      link: function postLink(scope, element) {

        try{
          if(!scope.field){
            throw new Error('Field model not found on current scope!');
          }
          else{

            var field = scope.field,
                type  = field.type;

            //set up numerable select options
            if(type === 'month') {
              field.options = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            }
            if(type === 'week'){
              field.options = [1,2,3,4,5,6,7,8,9,10,11,12];
            }
            if(type === 'day'){
              field.options = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
            }

            if(inputTypes.indexOf(type) !== -1){
              var compiled;
              if(DIRECTIVE_TYPES.indexOf(type) !== -1){
                compiled = $compile('<survey-' + type + '-component></survey-' + type + '-component>')(scope);
              }else{
                compiled = $compile('<survey-default-component></survey-default-component>')(scope);
              }
              element.replaceWith(compiled);
            }else{
              scope.field.type = 'text';
              element.replaceWith($compile('<survey-default-component></survey-default-component>')(scope));
              throw new Error('Type of input not found! \n Using default component!');
            }

            //set up the binding to the result where this field input should write to
            scope.answer = {content: ''};
            if(scope.result && scope.key){

              scope.$watch('answer.content',function(newValue){
                if(newValue){
                  scope.result[scope.key] = newValue;
                }
              });

              scope.$watch(
                function(){
                  return scope.result[scope.key];
                },
                function(newValue){
                  if(!newValue)
                    scope.answer = {content: ''};
                }
              );

              scope.$on('destroy', function(){
                delete scope.result[scope.key];
              });
            }else{
              throw new Error('Can not data bind result of input to the form. Check field or key attributes on this directive!');
            }

          }
        }catch(e){
          console.error(e.name);
          console.error(e.message);
        }

      }
    };
  });

module
  .controller('SurveyInputController', function($scope){
    console.log($scope.field);

    //this is only used for date component and for some reason, the pop up doesnt show without this
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = !$scope.opened;
    };

  });

module
  .directive('surveyDefaultComponent', function(){
    return {
      restrict: 'E',
      replace: true,
      controller: 'SurveyInputController',
      templateUrl: 'views/input_types/default_component.html'
    }
  });

angular.forEach(DIRECTIVE_TYPES, function(type){
  var component_name = 'survey-' + type + '-component';
  module.directive(camelCase(component_name), function(){
    return {
      restrict: 'E',
      //replace: true,
      controller: 'SurveyInputController',
      templateUrl: 'views/input_types/' + type + '_component.html'
    }
  });
});

function camelCase(input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}

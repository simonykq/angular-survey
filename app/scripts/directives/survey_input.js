'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyInputs
 * @description
 * # surveyInputs
 */

angular.module('surveyApp')
  .directive('surveyInput', function ($compile, $parse) {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        field: '=?',
        result: '=?binding',
        key: '@'
      },
      templateUrl: 'views/_survey_inputs.html',
      controller: function($scope){
          try{
              if(!$scope.field){
                  throw new Error('Field model not found on current scope!');
              }else{
                  var field = $scope.field,
                      type  = field.type;

                  //set up numerable select options
                  if(type === 'month') {
                      field.options = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  }
                  if(type === 'week'){
                      field.options = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
                  }
                  if(type === 'day'){
                      field.options = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
                  }

                  //set up the binding to the result where this field input should write to
                  $scope.answer = {content: null};
                  if($scope.result && $scope.key){

                      var ngModelBind   = $parse('result.' + $scope.key),
                          ngModelAssign = ngModelBind.assign;

                      $scope.$watch('answer.content',function(newValue){
                          if(newValue){
                              ngModelAssign($scope, newValue);
                          }
                      });

                      $scope.$watch(ngModelBind,
                          function(newValue){
                              $scope.answer = {content: newValue};
                          }
                      );

                      $scope.$on('destroy', function(){
                          delete $scope.result[$scope.key];
                      });
                  }else{
                      throw new Error('Can not data bind result of input to the form. Check field or key attributes on this directive!');
                  }
              }
          }
          catch(e){
              console.error(e.name);
              console.error(e.message);
          }

      }
    };
  });

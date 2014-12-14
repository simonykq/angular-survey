/**
 * Created by simonykq on 07/12/2014.
 */

angular.module('surveyApp')
  .directive('waiting', function(){
    return {
      restrict: 'AC',
      priority: 1000,
      transclude: 'element',
      link: function($scope, $element, $attrs, ctrl, $transclude){
        var sec = $scope.$eval($attrs.waiting);
        if(typeof sec === 'number'){
          var now = +new Date();
          while(+new Date() - now < sec*1000){}
          $transclude(function(clone){
            $element.replaceWith(clone);
          });
        }else{
          throw new Error("Not a number");
        }
      }
    }
  });

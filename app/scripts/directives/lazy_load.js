'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:lazyLoad
 * @description
 * # lazyLoad
 */
angular.module('surveyApp')
  .directive('lazyLoad', function () {
    return {
      restrict: 'AC',
      transclude: true,
      compile: function(element, attrs){

        element.html('<button class="btn btn-lg btn-warning text-center" style="display: block; margin: auto;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>');

        return function postLink($scope, $element, $attrs, ctrl, $transclude){
          var selector = $attrs.lazyLoad,
              loaded   = false;

          $('body').on('click', selector ,function(e){
            //e.preventDefault();
            if(!loaded){
              setTimeout(function(){
                $transclude(function(clone){
                  $element.empty();
                  $element.html(clone);
                });
              },500);
            }
            loaded = true;
          });
        }
      }
    };
  });

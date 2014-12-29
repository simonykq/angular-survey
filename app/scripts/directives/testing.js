'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:testing
 * @description
 * # testing
 */
angular.module('surveyApp')
  .directive('testing', function () {
    return {
      transclude: true,
      restrict: 'E',
      link: {
        pre: function(scope, element, attrs, ctrl, transclude){
          element.html('<h2>Pre link</h2>');
        },

        post: function(scope, element, attrs) {
          element.html('<h2>Post link</h2>');
        }
      }

    };
  });

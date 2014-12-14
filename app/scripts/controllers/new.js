'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:NewctrlJsCtrl
 * @description
 * # NewctrlJsCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('NewCtrl', function ($scope, $location) {

        prestineData();

        $scope.clearForm = function(form, data){
          if(form.$dirty){
            form.$setPristine();
            prestineData(data);
          }
        };

        $scope.submitForm = function(form, data){
          if(form.$valid){
            addSurvey(data);
            prestineData(data);
            form.$setPristine();
            $location.path('/');
          }else{
            form.$setDirty();
          }
        };

        $scope.addField = function(fields){
            var field = {
                question: '',
                type: ''
            };
            fields.push(field)
        };

        $scope.copyField = function(field){
            var newField = {
                question: field['question'],
                type: field['type']
            };
            $scope.data.fields.push(newField)
        };

        $scope.deleteField = function(field){
            var index = $scope.data.fields.indexOf(field);
            if(index !== -1){
                $scope.data.fields.splice(index, 1);
            }
        };

        $scope.hasOption = function(type){
            var selectable = [
              'select',
              'multi-select',
              'radio',
              'checkbox'
            ];
            return (selectable.indexOf(type) !== -1);
        };

        function prestineData(data){
          if(data){
            data.title = '';
            data.description = '';
            data.fields = [];
          }else{
            $scope.data = {
              title: '',
              description: '',
              fields: []
            };
          }
        }

        function addSurvey(data){
          if(data){
            $scope.$parent.surveys.push(angular.copy(data));
          }
        }

  });

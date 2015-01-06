'use strict';

/**
 * @ngdoc overview
 * @name surveyApp
 * @description
 * # surveyApp
 *
 * Main module of the application.
 */
angular
  .module('surveyApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'checklist-model',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function ($routeProvider,$locationProvider,$controllerProvider) {

    $controllerProvider.allowGlobals();
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/**
 * Created by simonykq on 30/11/2014.
 */

var TYPES = [
  'text',
  'number',
  'email',
  'url',
  'tel',
  'color',
  //'file',
  'range',
  'textarea',
  'select',
  'multi-select',
  'radio',
  'checkbox',
  'datetime',
  'date',
  'time',
  'month',
  'week',
  'day'
];

angular.module('surveyApp')
  .value('inputTypes', TYPES);

'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name surveyApp.controller:AppCtrlCtrl
 * @description
 * # AppCtrlCtrl
 * Controller of the surveyApp
 */
angular.module('surveyApp')
  .controller('AppCtrl', function ($scope) {
    $scope.surveys = [
      //{
      //  title: 'Survey one',
      //  description: 'Survey one desciption',
      //  fields: [
      //    {question: 'What is your name?', type: 'text', required: true},
      //    {question: 'What is your lucky number', type: 'number', required: true, maxlength: 100, minlength: 1},
      //    {question: 'When is your birthday?', type: 'date', required: true},
      //    {question: 'Who is your friend?', type: 'select', required: true , options: [{text: 'simon'}, {text: 'james'}, {text: 'chris'}, {text:'oliver'}]}
      //  ]
      //}
    ];
  });

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

        $scope.submitForm = function(form, data){
          if(form.$valid){
            addSurvey(data);
            prestineData(data);
            form.$setPristine();
            $location.path('/');
          }else{
            form.$setDirty();
            dirtyNestedFields(form);
          }
        };

        $scope.clearForm = function(form, data){
          if(form.$dirty){
            form.$setPristine();
            prestineData(data);
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

        function dirtyNestedFields(form){
          for(var field in form){
            //check for the nested fields and controls
            var ctrl = form[field];
            if (field[0] != '$') {
              ctrl.$setDirty();
              //check if this is actually a nested field
              if(ctrl.hasOwnProperty('$$parentForm')) dirtyNestedFields(ctrl);
            }
          }
        }

  });

'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyComponent
 * @description
 * # surveyComponent
 */
angular.module('surveyApp')
  .directive('surveyComponents', function () {
    return {
      templateUrl: 'views/_survey_components.html',
      restrict: 'E',
      controller: function($scope){

        $scope.submitForm = function(form, survey, result){
          if(form.$valid){
            //submit the survey with result to remote
            prestineResult(result);
            form.$setPristine();
            //form.$rollbackViewValue();
            alert('Submited!');
          }else{
            form.$setDirty();
            dirtyNestedFields(form);
          }
        };

        $scope.clearForm = function(form, result){
          if(form.$dirty){
            prestineResult(result);
            form.$setPristine();
            //form.$rollbackViewValue();
          }
        };

        function prestineResult(result){
          for (var prop in result) {
            result[prop] = null;
          }
        }

        function dirtyNestedFields(form){
          for(var field in form){
            //check for the nested fields and controls
            var ctrl = form[field];
            if (field[0] != '$' && ctrl.$pristine) {
              ctrl.$setDirty();
            }
          }
        }
      },
      scope: {
        surveys: '=components'
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyField
 * @description
 * # surveyField
 */
angular.module('surveyApp')
  .directive('surveyField', function () {
    return {
      templateUrl: '/views/_survey_field.html',
      transclude: true,
      restrict: 'E',
      scope: {
        field: '=',
        count: '@',
        copy: '&',
        delete: '&'
      },
      controllerAs: 'ctrl',
      controller: function($scope, inputTypes){

          this.field = $scope.field;

          this.inputTypes = inputTypes;

          this.copy = $scope.copy();
          this.delete = $scope.delete();

          this.isValidable = function(type){
            return this.isRequirable(type) || this.isRequirable(type) || this.isNumerable(type) || this.isDatable(type);
          };

          this.isRequirable = function(type){
            return ['checkbox',''].indexOf(type) === -1;
          };

          this.isRangable = function(type){
            return ['text', 'email', 'url', 'tel', 'textarea'].indexOf(type) !== -1;
          };

          this.isNumerable = function(type){
            return ['number','range'].indexOf(type) !== -1;
          };

          this.isDatable = function(type){
            return type === 'date';
          };

          this.cleanUp = function(shouldClean, field){
            if(shouldClean){
              delete this.field[field];
            }
          };

          this.isFormDirty = function(type,prop){
              var formName;
              if(type === 'field'){
                formName = 'nestedField_' + $scope.count;
                if($scope[formName] && $scope[formName][prop]){
                  return $scope[formName][prop].$dirty;
                }else {
                  return false;
                }
              }else{
                formName = 'nestedValidation_' + $scope.count;
                if($scope[formName] && $scope[formName][prop]){
                  return $scope[formName][prop].$dirty;
                }else{
                  return false
                }
              }
          };

        this.formError = function(type,prop){
          var formName;
          if(type === 'field'){
            formName = 'nestedField_' + $scope.count;
            if($scope[formName] && $scope[formName][prop]){
              return $scope[formName][prop].$error;
            }else {
              return null;
            }
          }else{
            formName = 'nestedValidation_' + $scope.count;
            if($scope[formName] && $scope[formName][prop]){
              return $scope[formName][prop].$error;
            }else{
              return null;
            }
          }
        }

      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:surveyFieldOptions
 * @description
 * # surveyFieldOptions
 */
angular.module('surveyApp')
  .directive('surveyFieldOptions', function () {
    return {
      templateUrl: '/views/_survey_field_options.html',
      restrict: 'E',
      require: '^^surveyField',
      scope: {},
      link: {
        pre: function(scope, element, attrs, ctrl){
          scope.field = ctrl.field;
          scope.newOption = {'text': ''};
          scope.field.options = scope.field.options || [];
        },
        post: function($scope){
          $scope.addOption = function(newOption){
            var text = newOption['text'];
            if(text && text !== '' && typeof text !== 'undefined'){
              $scope.field.options.push({'text': text});
              newOption['text'] = '';
            }
          };
          $scope.deleteOption = function(option){
            var index = $scope.field.options.indexOf(option);
            if(index !== -1){
              $scope.field.options.splice(index,1);
            }
          };
          $scope.$on('$destroy', function(){
            delete $scope.field.options
          });
        }
      }
    };
  });

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
      //replace: true,
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
          var date = new Date(value);
          if(!isNaN(date.getTime()) || !value || value === ''){
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


function datePickerController($scope){
  $scope.isOpen = false;
  //this is only used for date component and for some reason, the pop up doesnt show without this
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.isOpen = !$scope.isOpen;
  };
}

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

'use strict';

/**
 * @ngdoc directive
 * @name surveyApp.directive:log
 * @description
 * # log
 */
angular.module('surveyApp')
  .directive('log', function () {
        return {
            controller: function( $scope, $element, $attrs, $transclude ) {
                console.log( $attrs.log + ' (controller)' );
            },
            compile: function compile( tElement, tAttributes ) {
                console.log( tAttributes.log + ' (compile)'  );
                return {
                    pre: function preLink( scope, element, attributes ) {
                        console.log( attributes.log + ' (pre-link)'  );
                    },
                    post: function postLink( scope, element, attributes ) {
                        console.log( attributes.log + ' (post-link)'  );
                    }
                };
            }
        };
  });

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

        var dateMin = scope.$eval(attrs.dateMin);

        if(!dateMin){
          return;
        }else{
          var ngModel = ctrls[0];
          ngModel.$validators.mindate = function(modelValue){
            var value    = dateMin,
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

      }
    };
  });

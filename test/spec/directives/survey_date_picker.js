'use strict';

describe('Directive: surveyDatePicker', function () {

  // load the directive's module
  beforeEach(module('surveyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<survey-date-picker></survey-date-picker>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the surveyDatePicker directive');
  }));
});

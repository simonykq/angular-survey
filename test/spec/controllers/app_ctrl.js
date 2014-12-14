'use strict';

describe('Controller: AppCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('surveyApp'));

  var AppCtrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppCtrlCtrl = $controller('AppCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

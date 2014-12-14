'use strict';

describe('Controller: NewctrlJsCtrl', function () {

  // load the controller's module
  beforeEach(module('surveyApp'));

  var NewctrlJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewctrlJsCtrl = $controller('NewctrlJsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('SonataApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainController', {
      $scope: scope
    });
  }));

  it('Array must be empty', function () {
    expect(scope.api_url).toContain('http');
  });


});
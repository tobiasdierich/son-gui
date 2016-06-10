'use strict';

describe('GUI Integration test - Monitoring Server', function () {

  // load the controller's module
  beforeEach(module('SonataApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope


it('should returns status 200', inject(function($http,$httpBackend) {
  
  var $scope = {};

  
  /* Code Under Test */
  $http.get('http://sp.int3.sonata-nfv.eu:8000')
    .success(function(data, status, headers, config) {
    	console.log(data);
      	$scope.valid = true;
    })
    .error(function(data, status, headers, config) {
    	console.log(data);
      $scope.valid = false;
  });
  

  $httpBackend.when('GET', 'http://sp.int3.sonata-nfv.eu:8000').respond(200);
  $httpBackend.flush();

  expect($scope.valid).toBe(true);
  

}));


});
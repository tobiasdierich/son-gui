SonataApp.controller('FunctionsController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

  console.log('FUNCTIONS');

           $scope.getFunctions = function(){
            console.info('Get Functions call started. Url:'+$scope.apis.gatekeeper.functions);
             $http({
                method  : 'GET',
                url     : $scope.apis.gatekeeper.functions,
                headers : { 'Content-Type': 'application/json' }
               })
                .success(function(data) {
                  console.info('Get functions From Url: '+$scope.apis.gatekeeper.functions);
                  $scope.functions = data;
                })
                .error(function(data){
                  console.error('Get functions Failed. Get Url: '+$scope.apis.gatekeeper.functions);
                  console.error(data);
                })
           }




           
}]);
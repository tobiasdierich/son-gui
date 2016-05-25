SonataApp.controller('VnfsController',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	
  $scope.vms = "5";
  $scope.changeUrl = function(a){
    location.hash = a;
  }



    $scope.getVnfs = function(){

       





        $http({
          method  : 'POST',
          url     : $scope.api_url,
          data:  {
          "name": "vm_mem_perc",
          "start": ""+new Date().toISOString(),
          "end": ""+new Date().toISOString(),
          "step": "20m",
          "labels": [{"labeltag":"exported_job", "labelid":"vnf"}]
          },
          headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
           console.log("VNF");
           console.log(data);
            /*console.log(data.metrics.result);
            console.log(typeof(data.metrics.result));
            $scope.vms = data.metrics.result;*/
            $scope.vnfs = data.metrics.result;
            
          });





};
    $scope.init = function(){
      
    	$scope.getVnfs();
    	
    }

     
    
}]);
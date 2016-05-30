SonataApp.controller('MonitoringServicePlatform',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	
  $scope.vms = "5";
  $scope.changeUrl = function(a){
    location.hash = a;
  }



    $rootScope.getVms = function(){


        $http({
          method  : 'POST',
          url     : 'http://143.233.127.27:8000/api/v1/prometheus/metrics/data',
          data:  {
          "name": "vm_mem_perc",
          "start": ""+new Date().toISOString(),
          "end": ""+new Date().toISOString(),
          "step": "20m",
          "labels": [{"labeltag":"exported_job", "labelid":"vm"}]
          },
          headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
           console.log("VMS");
            console.log(data.metrics.result);
            console.log(typeof(data.metrics.result));
            $scope.vms = data.metrics.result;
            
          });





};
    $scope.init = function(){
      
    	$scope.getVms();
    	
    }

     
    
}]);
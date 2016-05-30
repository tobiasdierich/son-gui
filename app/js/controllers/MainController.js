SonataApp.controller('MainController',['$rootScope','$scope','$routeParams', '$location', '$http',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		
		
		
		/*$scope.apis.monitoring = 'http://sp.int2.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data';*/
		
		$scope.todos = new Array();


		 $scope.getServices = function(){

            console.info('Get Enviroment variables call started.');
             $http({
                method  : 'GET',
                url     : 'variables.php',
                headers : { 'Content-Type': 'application/json' }
               })
                .success(function(data) {
                  
                  console.info('Enviroment variables received');
                  console.log(data);

                  $scope.apis = {
						'monitoring':'http://'+data.MON_URL+'/api/v1/prometheus/metrics/data',
						'gatekeeper':{
							'services':'http://sp.int.sonata-nfv.eu:32001/services',
							'packages':'http://sp.int.sonata-nfv.eu:32001/packages'
						}
					}
					$rootScope.apis = $scope.apis;

                })
                .error(function(data){
                    console.error('Get Enviroment variables Failed.');
                })
           }

        $scope.getServices();

		

		if($rootScope.resp!=1){
			location.hash='/login';
		}else {
			$rootScope.is_user_logged_in = true;
		}


         
            


    $scope.changeHash = function(newHash){
    	location.hash = newHash;
    }

	$rootScope.checkIfFilesAreThere = function(){

		return 1;	
	}         
    

    }]);



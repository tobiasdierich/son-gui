SonataApp.controller('MainController',['$rootScope','$scope',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		$rootScope.gitResp = '';
		
		
		/*$scope.api_url = 'http://sp.int2.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data';*/
		$scope.api_url = 'http://143.233.127.27:8000/api/v1/prometheus/metrics/data';
		$scope.todos = new Array();
		

		if($rootScope.resp!=1){
			location.hash='/login';
		}else {
			$rootScope.is_user_logged_in = true;
		}


            $scope.urls = {
                                   
            };

            console.log('Sonata');
            


            $scope.changeHash = function(newHash){
            	location.hash = newHash;
            }

	$rootScope.checkIfFilesAreThere = function(){

		return 1;	
	}         
    

    }]);



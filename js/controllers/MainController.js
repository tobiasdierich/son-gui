SonataApp.controller('MainController',['$rootScope','$scope',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		$rootScope.gitResp = '';
		
		console.log($rootScope.resp);
		$scope.api_url = 'http://sp.int.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data';

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

    }]);



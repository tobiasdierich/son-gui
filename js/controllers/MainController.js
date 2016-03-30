SonataApp.controller('MainController',['$rootScope','$scope',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		$rootScope.gitResp = '';
		
		console.log($rootScope.resp);

		if($rootScope.resp!=1){
			location.hash='/login';
		}else {
			$rootScope.is_user_logged_in = true;
		}

            $scope.urls = {
                                   
            };

            console.log('Sonata');
            

    }]);



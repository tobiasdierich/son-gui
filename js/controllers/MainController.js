SonataApp.controller('MainController',['$rootScope','$scope',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		
		
		if($rootScope.gitResp==''){
			location.hash='/login';
		}else {
			$scope.is_user_logged_in = true;
		}

            $scope.urls = {
                                   
            };

            console.log('Sonata');
            

    }]);



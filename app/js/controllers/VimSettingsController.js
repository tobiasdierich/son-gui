SonataApp.controller('VimSettingsController',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	

	$scope.new_vim = {};




	$scope.post_a_vim = function(){
		
		$http({
          method  : 'POST',
          url     : $scope.apis.vims,
          headers : { 'Content-Type': 'application/json','Accept':'application/json' },
          data    : $scope.new_vim
         })
          .success(function(data) {
	        
	        console.log(data);
	        $('#new_vim_installed').openModal();  
	        $('#new_vim_installed h6').html("New Vim uuid: "+data.request_uuid);
        });
	}


	$scope.addAVim = function(){
			
	}

	$scope.getVims = function(){

      	$http({
          method  : 'GET',
          url     : $scope.apis.vims,
          headers : { 'Content-Type': 'application/json','Accept':'application/json' }
         })
          .success(function(data) {
            $scope.vims = new Array();
            $scope.vims.push(data);
            console.log($scope.vims);
            $scope.vims.forEach(function(vim,index){
					$scope.setVimStatus(vim);
	            })



          });


	}

	$scope.setVimStatus = function(vim){
		vim.status = '-';
	}


    $scope.init = function(){
    	$scope.getVims();
    }

     
    
}]);
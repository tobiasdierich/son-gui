SonataApp.controller('LoginController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

          $rootScope.user_email = '';
          $rootScope.password = '';
        $scope.failedMessageVisibility = 0;

          $scope.submitlogin = function(){
            $scope.failedMessageVisibility = 0;
              	var url = 'https://api.github.com';
				        $scope.httpGet(url,{Accept: "application/json", "Authorization": "Basic " + 
					                              btoa($scope.user_email+':'+$scope.password)}); 
            
          }

$scope.httpGet = function(url,headers){
	
    
    $.ajax({
        type: 'GET',
        headers: headers,
        url: url,
        async: false
    })
    .done(function(data, textStatus, jqXHR) {
        $rootScope.gitResp = data;
        $rootScope.resp = 1;
        location.hash = '/home';

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $scope.failedMessageVisibility = 1;
        $rootScope.resp = 0;
    });
    
}





           
}]);
SonataApp.controller('LoginController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

          $rootScope.user_email = '';
          $rootScope.password = '';


          $scope.submitlogin = function(){
            
              	var url = 'https://api.github.com';
				var resp = $scope.httpGet(url, {Accept: "application/json", "Authorization": "Basic " + 
					btoa($scope.user_email+':'+$scope.password)}); 
              	
              	if(resp==1)
              		location.hash = '/home';

            
          }

$scope.httpGet = function(url,headers){
	
    var resp = '';
    $.ajax({
        type: 'GET',
        headers: headers,
        url: url,
        async: false
    })
    .done(function(data, textStatus, jqXHR) {
        $rootScope.gitResp = data;
        resp = 1;

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        
        resp = 0;
    });
    return resp;
}





           
}]);
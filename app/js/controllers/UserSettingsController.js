/*
Copyright (c) 2015 SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
ALL RIGHTS RESERVED.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Neither the name of the SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written 
permission.

This work has been performed in the framework of the SONATA project,
funded by the European Commission under Grant number 671517 through 
the Horizon 2020 and 5G-PPP programmes. The authors would like to 
acknowledge the contributions of their colleagues of the SONATA 
partner consortium (www.sonata-nfv.eu).
*/

SonataApp.controller('UserSettingsController', function($scope, $routeParams, $location, $http,$rootScope,$filter) {

		$scope.cancel_pressed = function(){
			$scope.pop_one_view = 0;
		}
		$scope.pop_up_close = function(){
			$scope.pop_up_view = 0;
		}
		$scope.logged_again_ok = function(){
			
			$http({
                method  : 'PUT',
                url: $scope.apis.gatekeeper.users+'?username='+$rootScope.username,
                headers : $rootScope.getGKHeaders(),
                data:{
                	'username':$scope.info.username,
                	'password':$scope.info.password_one,
                	'email':$scope.info.email,
                	'user_type':'developer',
                	'last_name':$scope.info.last_name,
                	'first_name':$scope.info.first_name
                }
              })
	       .success(function(datas) {
	       	
	       		$rootScope.logout();	        	

	        });

			
		}
		$scope.saveUserInfo = function(){
			console.log($scope.info.password_one);
			$scope.error_message_view = 0;
			$scope.pop_one_view = 0;

			if($scope.info.password_one != $scope.info.password_two){
				$scope.error_message_view = 1;
				$scope.error_message_text = "Password fields are not equal. Please check the password you will set";
			}else{

				if($scope.info.password_one!='' && $scope.info.password_one!='undefined' && $scope.info.password_one!=undefined){
					$scope.pop_one_view = 1;
				
				}else{
					$http({
			                method  : 'PUT',
			                url: $scope.apis.gatekeeper.users+'?username='+$rootScope.username,
			                headers : $rootScope.getGKHeaders(),
			                data:{
			                	'username':$rootScope.username,
			                	'password':$rootScope.password,
			                	'email':$scope.info.email,
			                	'user_type':'developer',
			                	'last_name':$scope.info.last_name,
			                	'first_name':$scope.info.first_name
			                }
			              })
				       .success(function(datas) {
				       		$scope.pop_up_view = 1;
				       		$scope.pop_up_h3 = 'User Profile Updated';
				       		$scope.pop_up_p = 'The user profile has been updated correctly';
				        });
				}

			}
		}
     	
     	$scope.getUserInfo = function(){
				
	     	$http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.users,
                headers : $rootScope.getGKHeaders()
              })
	       .success(function(datas) {
	       		console.log("GET User INFO");
	       		console.log(datas);
	       		if($rootScope.username=='sonata'){
	       			console.log("FILTER");
	       			$scope.info = $filter('filter')(datas, {username:"sonata"})[0];
	       			console.log($scope.info);
	       		}else{
	       			$scope.info = datas;	
	       		}
	       		
	        })

   		}
   		$scope.getUserInfo();

     (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
	 
	 	$scope.$on('$viewContentLoaded', function(event) {
	  	
	    	$('select').material_select();
	  
	    });


    });



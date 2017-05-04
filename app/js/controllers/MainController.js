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

SonataApp.controller('MainController',['$rootScope','$scope','$routeParams', '$location', '$http',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainControllers');
		var debug=false;
		
		
		/*$scope.apis.monitoring = 'http://sp.int2.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data';*/
		
		$scope.todos = new Array();

		(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
		 $scope.getServices = function(){

            console.info('Get Enviroment variables call started.');
             $http({
                method  : 'GET',
                url     : 'variables.php',
                headers : { 'Content-Type': 'application/json' }
               })
                .success(function(data) {
                  
                  console.info('Enviroment variables received');
                  //console.log(data);

                  $scope.configuration = {
                  	'logs_range':'86400' //time range (minutes before)
                  }

                  $scope.apis = {
						'monitoring':data.MON_URL+'/api/v1/prometheus/metrics/data',
            'monitoring_list':data.MON_URL+'/api/v1/prometheus/metrics/list',
						'logs':data.LOGS_URL+'/search/universal/relative?',
						'vims':data.VIMS_URL+'/vims',
            'wims':data.VIMS_URL+'/wims',
						'gatekeeper':{
							'services' :data.GK_URL+'/services',
							'packages' :data.GK_URL+'/packages',
							'functions':data.GK_URL+'/functions',
							'requests' :data.GK_URL+'/requests'
						}
					}
				


					$rootScope.apis = $scope.apis;

                })
                .error(function(data){
                    console.error('Get Enviroment variables Failed.');
                })
           }


     if(typeof $rootScope.apis )
        $scope.getServices();

		
    
   	if(debug==false && $rootScope.resp!=1){
			location.hash='/login';
		}else {

			$rootScope.is_user_logged_in = true;
		}


$scope.alerts_visibility = 0;           


$rootScope.FixTimestamp = function(timestamp){

    timestamp = timestamp.replace('.','');
                
    if(timestamp.length==12)
        timestamp=timestamp+'0';
    else if(timestamp.length==11)
      timestamp = timestamp+'00';
    else if(timestamp.length==10)
      timestamp = timestamp+'000';
    else if(timestamp.length==9)
      timestamp = timestamp+'0000';

    return timestamp;
}


    $scope.changeHash = function(newHash){
    	location.hash = newHash;
    }

	$rootScope.checkIfFilesAreThere = function(){

		return 1;	
	}         
    

    }]);



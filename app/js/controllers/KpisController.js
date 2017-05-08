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

SonataApp.controller('KpisController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){
            
            (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
    
    $scope.user_registrations = 5;
    $scope.packages = 12;
    $scope.kpis = [];
    $scope.kpis.push({
    	'id':1,
    	'description':'Registered Users',
    	'sum':0,
    	'class':'blue-kpi',
    	'api_name':'user_registrations'

    });
    $scope.kpis.push({
    	'id':1,
    	'description':'Packages on Boarding',
    	'api_name':'package_on_boardings',
    	'sum':0,
    	'class':'green-kpi'

    });

    



    $scope.getBOX = function(kpi){
    	
    		$http({
                method  : 'POST',
                url     : "https://sp.int3.sonata-nfv.eu/monitoring/api/v1/prometheus/metrics/data",
                data:  {
                        "name": kpi.api_name,
                        "start": new Date(new Date().getTime() - 10000*60000).toISOString(),
                        "end": new Date().toISOString(),
                        "step": "10m",
                        "labels": [{}]
                          },
                headers : { 'Content-Type': 'application/json' }
              })
                .success(function(datas) {
                		console.log("E");
                		console.log(datas);


                		 datas.metrics.result.forEach(function(element, index) {
                		 	kpi.sum++;
                		 	
                		 });

                });
        
        
    }
    
    



    $scope.getKPIDetails = function(kpi){
			$scope.results_type = [];
			$scope.results =[];
			$scope.tags = [];
			$scope.modal = {};
			$('#modal1').openModal();
			$scope.modal.title = kpi.description;

    		$http({
                method  : 'POST',
                url     : "https://sp.int3.sonata-nfv.eu/monitoring/api/v1/prometheus/metrics/data",
                data:  {
                        "name": kpi.api_name,
                        "start": new Date(new Date().getTime() - 10000*60000).toISOString(),
                        "end": new Date().toISOString(),
                        "step": "10m",
                        "labels": [{}]
                          },
                headers : { 'Content-Type': 'application/json' }
              })
                .success(function(datas) {
                		console.log("E");
                		console.log(datas);

                		
                		datas.metrics.result.forEach(function(element,index){

                			var exists = 0;
                			$scope.tags.forEach(function(tag,index){
                				
                				if(tag.name==element.metric.result){
                					exists=1;
                					tag.counter++;
                				}
                			});
                			

                			if(exists==0){

                				$scope.tags.push({
                					"name":element.metric.result,
                					"counter":1
                				});
                			}

                			if(element.metric.result=='ok'){
                				$scope.results.push({'uuid':element.metric.uuid,"timest":$scope.convertToDate(element.values[0][0])});
                			}

                		});
                		
                	});

        
    }

        $scope.convertToDate = function(timest){

 			var timestamp = timest.toString();
                timestamp = timestamp.replace('.','');
                if(timestamp.length==12)
                            timestamp=timestamp+'0';
                    else if(timestamp.length==11)
                          timestamp = timestamp+'00';
                    else if(timestamp.length==10)
                          timestamp = timestamp+'000';
                    else if(timestamp.length==9)
                          timestamp = timestamp+'0000';
                    else if(timestamp.length==8)
                          timestamp = timestamp+'00000';
                timestamp = parseInt(timestamp);

        	return timestamp;
        }

        $scope.kpis.forEach(function(element,index){
    		$scope.getBOX(element);	
    	});
}]);
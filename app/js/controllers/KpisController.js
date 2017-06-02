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
    	'id':2,
    	'description':'Packages on Boarding',
    	'api_name':'package_on_boardings',
    	'sum':0,
    	'class':'green-kpi'
    });
    $scope.kpis.push({
        'id':3,
        'description':'Sync Requests',
        'api_name':'synch_monitoring_data_requests',
        'sum':0,
        'class':'light-kpi'
    });

    $scope.getBOX = function(kpi){
    	var start = new Date(new Date().getTime() - 10000*60000).toISOString();
        var end = new Date().toISOString();
        var step = '10m';
    		$http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.kpis+'?name='+kpi.api_name+'&start='+start+'&end='+end+'&step='+step,
                headers : $rootScope.gk_headers
              })
                .success(function(datas) {

                        var res=[];
                        if(datas.data.metrics)
                            res = datas.data.metrics;

                		 res.forEach(function(element, index) {
                		 	kpi.sum++;
                		 	
                		 });

                });
        
        
    }
    
    



    $scope.getKPIDetails = function(kpi){
        var start = new Date(new Date().getTime() - 10000*60000).toISOString();
        var end = new Date().toISOString();
        var step = '10m';

			$scope.results_type = [];
			$scope.results =[];
			$scope.tags = [];
			$scope.modal = {};
			$('#modal1').openModal();
			$scope.modal.title = kpi.description;

    		$http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.kpis+'?name='+kpi.api_name+'&start='+start+'&end='+end+'&step='+step,
                headers : $rootScope.gk_headers
              })
                .success(function(datas) {
                		console.log("KPI Details");
                		console.log(datas);
                        $scope.resl = datas.data.metrics;
                        $scope.selected_data_pie = [];
                        $scope.ss_states = [];

                        $scope.resl.forEach(function(kpi,index){
                            if($scope.ss_states.indexOf(kpi.labels.result)>=0){
                                
                                var result = $scope.selected_data_pie.filter(function( obj ) {
                                      return obj.name == kpi.labels.result;
                                });
                                result.y++;

                            }else{
                                $scope.ss_states.push(kpi.labels.result);
                                $scope.selected_data_pie.push({
                                    name:kpi.labels.result,
                                    y:1,
                                    sliced: true
                                });
                            }                            
                        });
                        
                            $scope.setResultChart();                        
                       
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



$scope.setResultChart = function(){
 Highcharts.chart('resultChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: $scope.modal.title
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Results',
        colorByPoint: true,
        data: $scope.selected_data_pie
    }]
});   
}

        




}]);
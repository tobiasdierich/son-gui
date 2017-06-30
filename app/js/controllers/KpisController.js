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

    $scope.vms_sum = {
        'id':4,
        'description':'VMs',
        'api_name':'vms_sum',
        'sum':0,
        'class':'pencile-kpi'
    };

    $scope.http_sum = {
        'id':5,
        'description':'Http Requests',
        'api_name':'http_requests_total',
        'sum':0,
        'class':'blue-kpi'
    };

    $scope.getVMsDetails = function(){


    }

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
    
    $scope.getHttPTotals = function(){
            
            $http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.kpis+'?name=http_requests_total',
                headers : $rootScope.gk_headers
              })
                .success(function(datas) {
                        console.log("Http Totals");
                        console.log(datas); 
                        
                       $scope.http_categories = [];
                       $scope.http_hndl = [];
                       $scope.http_handlers = [];

                       datas.data.metrics.forEach(function(dat){
                            $scope.http_handlers.push({                                           
                                    name: dat.labels.handler+":"+dat.labels.method+":"+dat.labels.code,
                                    y: parseInt(dat.value),
                                    drilldown: dat.labels.handler        
                                });

                        $scope.http_sum.sum+=parseInt(dat.value);
                           /* $scope.http_hndl.push({
                                name: dat.labels.handler+":"+dat.labels.method+":"+dat.labels.code,
                                y: [parseInt(dat.value)]

                            });
                            $scope.http_categories.push(dat.labels.handler+":"+dat.labels.method+":"+dat.labels.code);
                            console.log($scope.http_categories);*/
                        });
                })
    };
    $scope.getHttPTotals();

    $scope.getHttPTotalsDetails = function(){
        $('#modalhttps_details').openModal();

        Highcharts.chart('http_chart_container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total number of HTTP requests made'
    },
    xAxis: {
         type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Requests',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' '
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Handlers',
        colorByPoint: true,
        data: $scope.http_handlers
    }]

});


    };

    $scope.getVMsSum = function(){
         $http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.kpis+'?name='+$scope.vms_sum.api_name,
                headers : $rootScope.gk_headers
              })
                .success(function(datas) {
                        console.log("VMS Details");
                        console.log(datas); 
                        $scope.vms_sum.sum = datas.data.metrics[0].value;                 
                       
                    });
    }
     $scope.getVMsSum();
    $scope.getVMsDetails = function(){
        $('#modalvms_details').openModal();
        /*$scope.modal.title = $scope.vms_sum.description;*/
            
            $http({
                method  : 'GET',
                url: $scope.apis.gatekeeper.kpis+'?name=vms_state',
                headers : $rootScope.gk_headers
            })
            .success(function(datas) {
            
                        console.log("GET Details VMs");
                        console.log(datas); 

                        $scope.resl = datas.data.metrics;
                        $scope.selected_data_pie = [];
                        
                        $scope.ss_states = [];
                        if($scope.resl.length>0){

                            $scope.modal = {};
                            $scope.modal.title = "States of VMs";
                        $scope.resl.forEach(function(kpi,index){
                           
                            if($scope.ss_states.indexOf(kpi.labels.result)>=0){
                                var result = {};
                                    result = $scope.selected_data_pie.filter(function( obj ) {
                                
                                     if(obj.name==kpi.labels.state){
                                        return obj;
                                     }
                                        
                                });

                                result[0].y++;
                                
                                

                            }else{
                                $scope.ss_states.push(kpi.labels.state);
                                
                                $scope.selected_data_pie.push({
                                    name:kpi.labels.state,
                                    y:1,
                                    sliced: true
                                });
                                
                            }                            
                        });
                         }
                        
                            $scope.setResultChart(); 



                        
                       
                    });
        
    }




    $scope.getKPIDetails = function(kpi){
        $scope.kpi_timeline_data = [];
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
                        if($scope.resl.length>0){


                        $scope.resl.forEach(function(kpi,index){
                            console.log("DATE:");
                            
                            console.log(kpi.labels.time_stamp);
                            /*var x = new Date(kpi.labels.time_stamp);*/
                            var x = new Date(kpi.labels.time_stamp);
                           
                            $scope.kpi_timeline_data.push([x.getTime(), 1]);
                            console.log(x);
                            if($scope.ss_states.indexOf(kpi.labels.result)>=0){
                                var result = {};
                                    result = $scope.selected_data_pie.filter(function( obj ) {
                                
                                     if(obj.name==kpi.labels.result){
                                        return obj;
                                     }
                                        
                                });

                                result[0].y++;
                                
                                

                            }else{
                                $scope.ss_states.push(kpi.labels.result);
                                
                                $scope.selected_data_pie.push({
                                    name:kpi.labels.result,
                                    y:1,
                                    sliced: true
                                });
                                
                            }                            
                        });
                         }
                        
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
    credits: {
      enabled: false
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

var data = $scope.kpi_timeline_data;
//TODO: Remove - the following code is for testing purposes only.
if(data.length<4)
data = [
            [Date.UTC(2017, 1, 21), 0],
            [Date.UTC(2017, 2, 4), 1],
            [Date.UTC(2017, 2, 9), 1],
            [Date.UTC(2017, 2, 27), 1],
            [Date.UTC(2017, 3, 2), 1],
            [Date.UTC(2017, 3, 26), 2],
            [Date.UTC(2017, 4, 29), 3],
            [Date.UTC(2017, 5, 1), 3],
            [Date.UTC(2017, 5, 2), 4],
            [Date.UTC(2017, 5, 3), 5],
            [Date.UTC(2017, 5, 11), 5],
            [Date.UTC(2017, 5, 25), 6],
            [Date.UTC(2017, 6, 11), 7],
            [Date.UTC(2017, 6, 11), 7],
            [Date.UTC(2017, 6, 19), 8],
            [Date.UTC(2017, 6, 25), 8],
            [Date.UTC(2017, 6, 29), 8],
            [Date.UTC(2017, 6, 30), 9]
        ];
 Highcharts.chart('kpi_timeline', {
                              chart: {
                                  zoomType: 'x',
                              },
                              title: {
                                  text: 'ΤimeLine'
                              },
                              subtitle: {
                                  text: document.ontouchstart === undefined ?
                                          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                              },
                              xAxis: {
                                  type: 'datetime'
                              },
                              yAxis: {
                                  title: {
                                      text: ''
                                  }
                              },
                              legend: {
                                  enabled: false
                              },
                              credits: {
                                enabled: false
                              },
                              plotOptions: {
                                  area: {
                                      fillColor: {
                                          linearGradient: {
                                              x1: 0,
                                              y1: 0,
                                              x2: 0,
                                              y2: 1
                                          },
                                          stops: [
                                              [0, '#262B33'],
                                              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                          ]
                                      },
                                      marker: {
                                          radius: 2
                                      },
                                      lineWidth: 1,
                                      states: {
                                          hover: {
                                              lineWidth: 1
                                          }
                                      },
                                      threshold: null
                                  }
                              },
                              
    series: [{
        name: $scope.modal.title,
        data: data
    }]
                          });





}

        




}]);
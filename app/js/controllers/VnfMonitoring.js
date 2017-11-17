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

SonataApp.controller('VnfMonitoring',['$rootScope','$scope','$routeParams','$location','$http','$interval',function($rootScope,$scope, $routeParams, $location, $http,$interval){
	
  $scope.vnf = {};
  $scope.a_metrics = [];
  $scope.pagecharts = [];
  $scope.vnf.currentMemoryUsage = 0;
  $scope.vnf.currentCPUUsage = 0;
	$scope.current_time = new Date();
  $scope.ten_m_before = new Date($scope.current_time.getTime() - 15*60000);
  $scope.settings_modal = {};
  $scope.settings_modal.title = "Chart configuration";

  $scope.potential_timeranges = [];
  $scope.potential_timeranges.push({id:1,range:'1min',val:1});
  $scope.potential_timeranges.push({id:2,range:'5mins',val:5});
  $scope.potential_timeranges.push({id:3,range:'10mins',val:10});
  $scope.potential_timeranges.push({id:4,range:'15mins',val:15});
  $scope.potential_timeranges.push({id:5,range:'20mins',val:20});
  $scope.potential_timeranges.push({id:6,range:'1hour',val:60});
  $scope.potential_timeranges.push({id:7,range:'24hours',val:1440});


  $scope.potential_step = [];
  $scope.potential_step.push({id:1,step:'1sec',val:'1s'});
  $scope.potential_step.push({id:2,step:'15sec',val:'15s'});
  $scope.potential_step.push({id:3,step:'30sec',val:'30s'});
  $scope.potential_step.push({id:4,step:'1min',val:'1m'});
  $scope.potential_step.push({id:5,step:'5min',val:'5m'});
  $scope.potential_step.push({id:6,step:'10min',val:'10m'});

  


  $scope.boxes = [];

$scope.newChartBtn = function(){

  var thebox = {
    id:'box_'+parseInt(Math.random()*10000),
    class:'col s12 m6',
    title:'',
    measurement_name:''
  };

  $scope.boxes.push(thebox);
  $scope.configureBox(thebox);
}

$scope.configureBox = function(box){
  $scope.selected_box = box;
  $('#settings_modal').openModal();
}

$scope.updateBox = function(box){
  $scope.fillnewBox(box);
}
$scope.removeBox = function(box){
  /*$scope.getObjById($scope.boxes, parseInt(box.id));*/

  for (var i =0; i < $scope.boxes.length; i++)
   if ($scope.boxes[i].id === box.id) {
      $scope.boxes.splice(i,1);
      break;
   }

}

$scope.saveBoxConfiguration = function(){
  $scope.selected_box.measurement = $scope.settings_modal.measurement;
  $scope.selected_box.time_range  = $scope.settings_modal.time_range;
  $scope.selected_box.step        = $scope.settings_modal.step;
  $scope.fillnewBox($scope.selected_box);
}





$scope.getAllPotentialMeasurements = function(){
  
  $http({
          method  : 'GET',
          url     : $scope.apis.monitoring_list,
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
           $scope.potential_graphs = [];

            angular.forEach(data.metrics,function(d){
              console.log(d);
              if(d.startsWith("vm_") && d!='vm_status' && d!='vm_power_state' && d!='vm_last_update'){
                
                $scope.potential_graphs.push(d);
              }
            });   
            
          });
}
$scope.getAllPotentialMeasurements();



$scope.fillnewBox = function(box){


  var tt = $scope.getObjById($scope.potential_timeranges, parseInt(box.time_range));              
  var st = $scope.getObjById($scope.potential_step, parseInt(box.step));


$http({
                method  : 'POST',
                url     : $scope.apis.monitoring,
                data:  {
                        "name": box.measurement,
                        "start": ""+ new Date(new Date().getTime() - parseInt(tt.val)*60000).toISOString(),
                        "end": ""+new Date().toISOString(),
                        "step": st.val,
                        "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                          },
                headers : { 'Content-Type': 'application/json' }
              })
                .success(function(datas) {
                    $scope.data = [];
                    if(datas.metrics.result[0]){
                     datas.metrics.result[0].values.forEach(function(element, index) {
          
                            var timestamp = element[0].toString();
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
                            $scope.data.push([timestamp,parseFloat(element[1])]);
                         
                       });


                     $scope.g_charts.push(Highcharts.stockChart(box.id, {
                              chart: {
                                  zoomType: 'x'
                              },
                              animation:false,
                              rangeSelector: {
                                  enabled: false
                              },
                              navigator: {
                                  enabled: false
                              },
                              title: {
                                  text: box.measurement
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
                                      text: 'Values'
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
                                              [1, '#FFFFFF']
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
                                  type: 'line',
                                  color: '#454e5d',
                                  name: box.measurement,
                                  data: $scope.data
                              }]
                          }));



                    }






                });




            





}





$scope.getObjById = function(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return arr[d];
        }
    }
}



















$scope.addPoints = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    var series = 0;
    $scope.addSeries = function () {
      var rnd = []
      for (var i = 0; i < 10; i++) {
        rnd.push(Math.floor(Math.random() * 20) + 1)
      }
      $scope.chartConfig.series.push({
        data: rnd,
        id: 'series_' + series++
      })
    }

    $scope.removeRandomSeries = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
      this.chartConfig.chart.polar = !this.chartConfig.chart.polar;

    }

    

$scope.getVM = function(){
  $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "vm_mem_perc",
                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10m",
                  "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

           $scope.vnf.exported_instance = data.metrics.result[0].metric.exported_instance;
           $scope.vnf.instance          = data.metrics.result[0].metric.instance;
           $scope.vnf.group             = data.metrics.result[0].metric.group;
           $scope.vnf.id                = data.metrics.result[0].metric.id;
            
          });
}




$scope.drawGaugesRAM = function(){
   google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Memory', parseFloat($scope.vnf.currentMemoryUsage)],
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('vRAMschart'));
        chart.draw(data, options);
      }
}

$scope.drawGauges = function(){
   google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],          
          ['CPU', parseFloat($scope.vnf.currentCPUUsage)]
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('vCPUschart'));

        chart.draw(data, options);

       
      }
}

$scope.drawTheChart = function(data_array,options,element){

       var data = google.visualization.arrayToDataTable(data_array);
       var options = options;
       var chart = new google.visualization.AreaChart(document.getElementById(element));
       chart.draw(data, options);
       

}


$scope.historyRAM = function(){


        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {


     
                  "name": "vm_mem_perc",
                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10s",
                  "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            console.log('RAM SUccess');
            console.log(data);


            $scope.ramdata = [];
           $scope.vnf.currentMemoryUsage = 100-data.metrics.result[0].values[data.metrics.result[0].values.length-1][1];
           data.metrics.result[0].values.forEach(function(element, index) {

                  var timestamp = element[0].toString();
                  timestamp = timestamp.replace('.','');
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
                  $scope.ramdata.push([timestamp,parseFloat(100-element[1])]);
                  

                if(index==data.metrics.result[0].values.length-1){
                  
                  $scope.vnf.currentMemoryUsage = parseFloat(100-element[1]);
                  $scope.drawGauges();
                }

             });



                $scope.g_charts.push(Highcharts.stockChart('ram_chart_new_vnf', {
                              chart: {
                                zoomType: 'x',
                                animation:false,
                                  rangeSelector: {
                                    enabled: false
                                  },
                                  navigator: {
                                    enabled: false
                                  },
                                  animation:false,
                                  events: {
                                      load: function () {

                                          
                                          var series = this.series[0];
                                          $scope.intervals.push($interval(function () {

                                          $http({
                                                  method  : 'POST',
                                                  url     : $scope.apis.monitoring,
                                                  data:  {                                             
                                                          "name": "vm_mem_perc",
                                                          "start": ""+ new Date().toISOString(),
                                                          "end": ""+new Date().toISOString(),
                                                          "step": "10s",
                                                          "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                                                            },
                                                  headers : { 'Content-Type': 'application/json' }
                                                 })
                                                  .success(function(data) {
                                                    console.log(data);
                                                    
                                                    var y = data.metrics.result[0].values[0][1];
                                                    var x = data.metrics.result[0].values[0][0];
                                                    var timestamp = x.toString();
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
                                                      
                                                      series.addPoint([timestamp, parseFloat(100-y)], true, true);
                                                      $scope.vnf.currentMemoryUsage = 100-y;
                                                      $scope.drawGaugesRAM();

                                                  })                                          





                                          }, 5000));
                                      


                                      }
                                    }
                              },
                              title: {
                                  text: 'Memory usage over time'
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
                                      text: 'RAM %'
                                  }
                              },
                              animation:false,
                                  rangeSelector: {
                                    enabled: false
                                  },
                                  navigator: {
                                    enabled: false
                                  },
                              legend: {
                                  enabled: false
                              },
                              credits: {
                                enabled: false
                              },
                              plotOptions: {
                                  area: {
                                      /*fillColor: {
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
                                      },*/
                                      marker: {
                                          radius: 1
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
                                  type: 'line',
                                  color: '#454e5d',
                                  name: 'RAM',
                                  data: $scope.ramdata
                              }]
                          }));
          });
}






$scope.historyCPU = function(){

 $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "vm_cpu_perc",
                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10s",
                  "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            $scope.prdata = [];          
            //cpu manos          
            $scope.vnf.currentCPUUsage = data.metrics.result[0].values[data.metrics.result[0].values.length-1][1];                    
            data.metrics.result[0].values.forEach(function(element, index) {

                  var timestamp = element[0].toString();
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
                  $scope.prdata.push([timestamp,parseFloat(element[1])]);

                 if(index==data.metrics.result[0].values.length-1){

                  $scope.vnf.currentCPUUsage = parseFloat(element[1]);
                  $scope.drawGauges();
                }
            

             });

                       $scope.g_charts.push(Highcharts.stockChart('cpu_chart_new_vnf', {
                              chart: {
                                  zoomType: 'x',
                                  animation:false,
                                  rangeSelector: {
                                    enabled: false
                                  },
                                  navigator: {
                                    enabled: false
                                  },
                                  events: {
                                      load: function () {

                                          
                                          var series = this.series[0];
                                          $scope.intervals.push($interval(function () {

                                          $http({
                                                  method  : 'POST',
                                                  url     : $scope.apis.monitoring,
                                                  data:  {
                                                        "name": "vm_cpu_perc",
                                                        "start": ""+ new Date().toISOString(),
                                                        "end": ""+new Date().toISOString(),
                                                        "step": "10s",
                                                        "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                                                            },
                                                  headers : { 'Content-Type': 'application/json' }
                                                 })
                                                  .success(function(data) {
                                                    
                                                    var y = data.metrics.result[0].values[0][1];
                                                    var x = data.metrics.result[0].values[0][0];
                                                    var timestamp = x.toString();
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
                                                      
                                                      series.addPoint([timestamp, parseFloat(y)], true, true);
                                                      $scope.vnf.currentCPUUsage = parseFloat(y);
                                                      $scope.drawGauges();


                                                  })

                                          }, 5000));
                                      


                                      }
                                    }
                              },
                              title: {
                                  text: 'CPU usage over time'
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
                                      text: 'CPU %'
                                  }
                              },
                              animation:false,
                                  rangeSelector: {
                                    enabled: false
                                  },
                                  navigator: {
                                    enabled: false
                                  },
                              legend: {
                                  enabled: false
                              },
                              credits: {
                                enabled: false
                              },
                              /*plotOptions: {
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
                              },*/

                              series: [{
                                  type: 'line',
                                  color: '#454e5d',
                                  name: 'CPU',
                                  data: $scope.prdata
                              }]
                          }));
          });

}





$scope.historyHardDisk = function(){

        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "vm_disk_usage_perc",
                  "start": ""+ new Date(new Date().getTime() - 15*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "1m",
                  "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            $scope.vnf.disk_total = 0;
            data.metrics.result.forEach( function(element, index) {
              var m= element.metric.file_system;
              if(m.startsWith("/dev")){

                $scope.vnf.disk_total = parseFloat(element.values[0][1]);


                 $http({
                    method  : 'POST',
                    url     : $scope.apis.monitoring,
                    data:  {
                            "name": "vm_disk_usage_perc",
                            "start": ""+ new Date(new Date().getTime() - 15*60000).toISOString(),
                            "end": ""+new Date().toISOString(),
                            "step": "1m",
                            "labels": [{"labeltag":'exported_job','labelid':'vnf'},{"labeltag":"id","labelid":$routeParams.name}]
                              },
                    headers : { 'Content-Type': 'application/json' }
                   })
                    .success(function(data) {
                      
                    
                    data.metrics.result.forEach( function(element, index) {
                        var m= element.metric.file_system;
                        if(m.startsWith("/dev")){
                          $scope.kam_disk = [];
                          element.values.forEach( function(value, index) {

                              var timestamp = value[0].toString();
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

                              $scope.kam_disk.push([timestamp,parseFloat(value[1])]);
                          });

                        }
                      
                      });
                  
            
              $scope.g_charts.push(Highcharts.stockChart('disk_chart_new_vnf', {
                              chart: {
                                  zoomType: 'x',
                              },
                              rangeSelector: {
                                  enabled: false
                              },
                              navigator: {
                                  enabled: false
                              },
                              animation:false,
                              title: {
                                  text: 'Disk usage over time'
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
                                      text: 'Disk Usage %'
                                  }
                              },
                              legend: {
                                  enabled: false
                              },
                              credits: {
                                enabled: false
                              },
                              /*plotOptions: {
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
*/
                              series:[{
                                  type: 'line', 
                                  color: '#454e5d',
                                  name: 'Disk',
                                  data: $scope.kam_disk
                              }]
                          }));


                   

                    });





              }

            });
          
          });





}






    
    $scope.getContainers = function(){
      

      $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_mem_perc",
                  "start": ""+ $scope.ten_m_before.toISOString(),
                  "end": ""+$scope.current_time.toISOString(),
                  "step": "20m",
                  "labels": [{"labeltag":"exported_job", "labelid":"containers"},{"labeltag":"id","labelid":$routeParams.name}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
            $scope.containers = data.metrics.result;
          });



    }


    $scope.init = function(){
      (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
      $scope.g_charts = [];
      $scope.intervals = [];
      $('.hchart').each(function(c){$(this).empty();});
      $('.highcharts-container').each(function(c){$(this).empty();});

      $scope.getVM();
      $scope.drawGauges();
      $scope.drawGaugesRAM();


      $scope.historyCPU();
      $scope.historyRAM();
      $scope.historyHardDisk();
      $scope.getContainers();
    	
    }


     $scope.$on("$destroy", function(){
        $('.hchart').each(function(c){$(this).empty();});
        $('.highcharts-container').each(function(c){$(this).empty();});

        $scope.g_charts.forEach(function(chart){
          chart.destroy();
          chart = null;
        });
        $scope.g_charts = [];
        $scope.intervals.forEach(function(interval){
          $interval.cancel(interval);
        });

         $scope.kam_disk.clear();
         $scope.prdata.clear();
         $scope.ramdata.clear();
         $scope.vnf.clear();
         $scope.data.clear();
      });
    
    
}]);
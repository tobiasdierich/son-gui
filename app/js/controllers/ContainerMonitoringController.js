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

SonataApp.controller('ContainerMonitoring',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
  $scope.container = {};
  $scope.a_metrics = [];
  $scope.container.currentMemoryUsage = 0;
  $scope.container.currentCPUUsage = 0;
  $scope.current_time = new Date();
  $scope.ten_m_before = new Date($scope.current_time.getTime() - 20*60000);

$scope.getContainer = function(){
  $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_mem_perc",
                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10m",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
            
           $scope.container.exported_instance = data.metrics.result[0].metric.exported_instance;
           $scope.container.image_name= data.metrics.result[0].metric.image_name;
           $scope.container.id = data.metrics.result[0].metric.id;
            
          });
}


$scope.getLogs = function(){
  

      $http({
          method  : 'GET',
          url     : $scope.apis.logs+'query=container_id%3D'+$routeParams.id+'&range='+$scope.configuration.logs_range+'&fields=source%2Ccommand%2Ccontainer_id%2Ccontainer_name%2Ccreated%2Cimage_id%2Cimage_name%2Clevel%2Cmessage',
          headers : {'accept': 'application/json', 'Content-Type': 'application/json','Authorization': 'Basic YWRtaW46czBuQHRA' }
         })
          .success(function(data) {
              
              $scope.logs=data.messages;

          });


}

$scope.getCurrentMemory = function(){
  
   $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_mem_perc",
                  "start": ""+ new Date().toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10m",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
          

           $scope.container.currentMemoryUsage = data.metrics.result[0].values[0][1];
           
           
            
          });
}

$scope.getCurrentCPU = function(){
  
   $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_cpu_perc",
                  "start": ""+ new Date().toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "1m",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            $scope.container.currentCPUUsage = data.metrics.result[0].values[0][1];
           
           if($scope.container.currentCPUUsage>99)
            $scope.container.currentCPUUsage=100;
            
          });
}


$scope.getCPU_History = function(){
  
   $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_cpu_perc",

                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "10s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
       
            
          });
}


 
        
        /*var m=[['Time', 'Used', 'Total']];

        data.metrics.result[0].values.forEach( function(element, index) {
          
           
            m.push(['100',parseFloat(element[1]),400]);
            
          

        });
          var options = {
              title: 'CPU',
              hAxis: {title: 'Timestamp',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0}
            };
            console.log(m);
           $scope.drawTheChart(m,options,'cpu_chart');*/

$scope.drawGauges = function(){
   google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Memory', parseFloat($scope.container.currentMemoryUsage)],
          ['CPU', parseFloat($scope.container.currentCPUUsage)]
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('cnt_vCPUschart'));

        chart.draw(data, options);

        setInterval(function() {
          $scope.getCurrentMemory();          
          data.setValue(0, 1, parseFloat($scope.container.currentMemoryUsage));
          chart.draw(data, options);
        }, 30000);
        setInterval(function() {
          $scope.getCurrentCPU(); 
          data.setValue(1, 1, parseFloat($scope.container.currentCPUUsage));
          chart.draw(data, options);
        }, 30000);
       
      }
}

$scope.drawTheChart = function(data_array,options,element){

       var data = google.visualization.arrayToDataTable(data_array);
       var options = options;
       if(element!=''){
       var chart = new google.visualization.AreaChart(document.getElementById(element));
       chart.draw(data, options);
       }

}

    $scope.drawCPUChart = function(){
       
       google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var m=[
          ['Time', 'Percent']
        ];

        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_cpu_perc",

                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "30s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
       
            data.metrics.result[0].values.forEach( function(element, index) {
          
           
            var timestamp = element[0].toString();
            timestamp = timestamp.replace('.','');
            
                timestamp = new Date(parseInt(timestamp));

                if(element[1]>99)
                  element[1]=100;
               m.push([timestamp,parseFloat(element[1])]);

            });

            var options = {
              title: 'CPU',
              hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0,maxValue:100}
            };
            


              $scope.drawTheChart(m,options,'cnt_cpu_chart');


          });



        

        
      }
    }




     $scope.drawMEMChart = function(){
       
       google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        


        var m=[
          ['Time', 'Percent']
        ];

        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_mem_perc",
                  "start": ""+ new Date(new Date().getTime() - 20*60000).toISOString(),
                  "end": ""+new Date().toISOString(),
                  "step": "30s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
       
            data.metrics.result[0].values.forEach( function(element, index) {
          
           
            var timestamp = element[0].toString();
            timestamp = timestamp.replace('.','');
            
            timestamp = new Date(parseInt(timestamp));

            m.push([timestamp,parseFloat(element[1])]);

            });
           


            var options = {
              title: 'Memory',
              hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0,maxValue:100}
            };
            


              $scope.drawTheChart(m,options,'cnt_mem_chart');


          });

      }
    }












    $scope.drawRxTxChart = function(){
       
       google.charts.setOnLoadCallback(drawChart);

      function drawChart() {        
        var tstart = new Date(new Date().getTime() - 20*60000).toISOString();
        var tend = new Date().toISOString();
        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data:  {
                  "name": "cnt_net_rx_MB",
                  "start": ""+ tstart,
                  "end": ""+tend,
                  "step": "30s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                  },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            $scope.rx = data;


                        $http({
                      method  : 'POST',
                      url     : $scope.apis.monitoring,
                      data:  {
                              "name": "cnt_net_tx_MB",
                              "start": ""+ tstart,
                              "end": ""+tend,
                              "step": "30s",
                              "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                              },
                      headers : { 'Content-Type': 'application/json' }
                     })
                      .success(function(data) {

                          $scope.tx = data;
                          $scope.kam = [['Time', 'Rx','Tx']];


                            $scope.rx.metrics.result[0].values.forEach( function(rx, index) {
                                  var ttime = rx[0];
                                  var rx_value = rx[1];
                                  var tx_value = $scope.tx.metrics.result[0].values[index][1];


                                  var timestamp = ttime.toString();
                                  timestamp = timestamp.replace('.','');
                                  timestamp = new Date(parseInt(timestamp));
                                  $scope.kam.push([timestamp,parseFloat(rx_value),parseFloat(tx_value)]);






                            });

                             var options = {
                              title: 'Rx/Tx',
                              hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
                              vAxis: {minValue: 0}
                            };
                            
                            
                              $scope.drawTheChart($scope.kam,options,'cnt_rx_tx_chart');


                      });




         
          });


      
      }

    }


















    $scope.drawDiskChart = function(){
       
       google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
        


       
          var the_start = new Date(new Date().getTime() - 20*60000).toISOString();
          var the_end = new Date().toISOString();

        $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data    : {
                  "name": "cnt_block_in_MB",
                  "start": ""+the_start,
                  "end": ""+the_end,
                  "step": "30s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

              var the_in = data;

             $http({
          method  : 'POST',
          url     : $scope.apis.monitoring,
          data    : {
                  "name": "cnt_block_ou_MB",
                  "start": ""+the_start,
                  "end": ""+the_end,
                  "step": "30s",
                  "labels": [{"labeltag":"id","labelid":$routeParams.id}]
                    },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {

            var the_out = data;

             $scope.kam = [['Time', 'In','Out']];
             
             var l = the_in.metrics.result[0].values.length;
             i=0;
             while(i<l){
              var time = the_in.metrics.result[0].values[i][0];
              var t_in = the_in.metrics.result[0].values[i][1];
              var t_out = the_out.metrics.result[0].values[i][1];

              var timestamp = time.toString();
                timestamp = timestamp.replace('.','');
                timestamp = new Date(parseInt(timestamp));
                $scope.kam.push([timestamp,parseFloat(t_in),parseFloat(t_out)]);

              i++;
             }
             

            var options = {
              title: 'Disk',
              hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
              vAxis: {title: 'MB',minValue: 0}
            };
            
            
              $scope.drawTheChart($scope.kam,options,'cnt_disk_chart');




          });

            

          
          });

      }

     
    }

    
    


    $scope.init = function(){
      (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
      $scope.getContainer();
      $scope.drawGauges();
      $scope.drawCPUChart();
      $scope.drawMEMChart();
      $scope.drawRxTxChart();
      $scope.drawDiskChart();
      $scope.getCurrentMemory();
      $scope.getCPU_History();
      $scope.getLogs();

      
      setInterval(function() {
          $scope.drawCPUChart();
          $scope.drawMEMChart();          
          
        }, 30000);
      
      //drawCPUS
      //drawMEMS
      //drawRX/TX
      //drawDISC
      

      /*$scope.getCPU();
      $scope.getMEM();
      $scope.getLineGraph();*/
      
      /*$scope.FillCPUGraph();*/
       /*setInterval(function() {
          $scope.FillCPUGraph();
        }, 5000);*/
      
    }

     
    
}]);
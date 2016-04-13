SonataApp.controller('VmMonitoring',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	
  $scope.vm = {};
  $scope.changeUrl = function(a){
    location.hash = a;
  }

  console.log($routeParams.name)



  $scope.getLineGraph = function(){
 
	}
$scope.a_metrics = [];
	
	$scope.FillCPUGraph = function(){
		var current_time = new Date();
    	var ten_m_before = new Date(current_time.getTime() - 20*60000); //20 minutes before (20*60*1000)

    	
        $http({
          method  : 'POST',
          url     : 'http://sp.int.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data',
          data:  {
          "name": "vm_cpu_perc",
          "start": ""+ten_m_before.toISOString(),
          "end": ""+current_time.toISOString(),
          "step": "1s",
          "labels": [{"labeltag":"exported_instance",'labelid':$routeParams.name}]
          },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
          	google.charts.setOnLoadCallback($scope.drawCPUChart());
          	$scope.a_metrics = data.metrics.result[0].values;          	
			     
            
          });

	}
	$scope.drawCPUChart = function() {
			        $scope.d = [['Time', 'Used Memory', 'Total Memory']];
		          	$scope.a_metrics.forEach( function(metr, index) {
		          		$scope.d.push([new Date(parseFloat(metr[0])),parseFloat(metr[1]),9.5]);
		          		console.log(metr[0]);
		          	});
          			var data = google.visualization.arrayToDataTable($scope.d);
			        var options = {
			          title: 'VM Memory',
			          hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
			          vAxis: {title: 'Memory Usage',minValue: 9}
			        };

			        var chart = new google.visualization.AreaChart(document.getElementById('line_chart'));
			        chart.draw(data, options);
			      }





	$scope.getLastCPU = function(){
		var current_time = new Date();
    	var ten_m_before = new Date(current_time.getTime() - 10*60000);

    	
        $http({
          method  : 'POST',
          url     : 'http://sp.int.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data',
          data:  {
          "name": "vm_cpu_perc",
          "start": ""+ten_m_before.toISOString(),
          "end": ""+current_time.toISOString(),
          "step": "1s",
          "labels": [{"labeltag":"exported_instance",'labelid':$routeParams.name}]
          },
          headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
          	console.log(data);

          	

          	//$scope.vm.cpu = data.metrics.result[0].values[0][1];
           	/**/
           	$scope.vm.cpu = data.metrics;
           	$scope.vm.current_cpu = parseFloat(data.metrics.result[0].values[0][1]);
            
          });
	}


    $scope.getCPU = function(){
    	var current_time = new Date();
    	var ten_m_before = new Date(current_time.getTime() - 5000);

    	
        $http({
          method  : 'POST',
          url     : 'http://sp.int.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data',
          data:  {
          "name": "vm_cpu_perc",
          "start": ""+ten_m_before.toISOString(),
          "end": ""+current_time.toISOString(),
          "step": "1s",
          "labels": [{"labeltag":"exported_instance",'labelid':$routeParams.name}]
          },
          headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
          	console.log(data);

          	

          	//$scope.vm.cpu = data.metrics.result[0].values[0][1];
           	/**/
           	$scope.vm.cpu = data.metrics;
           	$scope.vm.current_cpu = parseFloat(data.metrics.result[0].values[0][1]);
            
          });
};

	


	

	function drawChart(){

		var data = google.visualization.arrayToDataTable([
	          ['Label', 'Value'],
	          ['Memory', $scope.vm.current_mem],
	          ['CPU', $scope.vm.current_cpu]
	        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };


        var chart = new google.visualization.Gauge(document.getElementById('vCPUschart'));

        chart.draw(data, options);

        setInterval(function() {
          $scope.getMEM();
          data.setValue(1, 1, $scope.vm.current_mem);
          chart.draw(data, options);
        }, 300000);
        setInterval(function() {
          $scope.getCPU();
          data.setValue(0, 1, $scope.vm.current_cpu);          
          chart.draw(data, options);
        }, 300000);
    }




		function drawGauges(){
			var total = 100;
			var used = parseFloat($scope.vm.cpu);
        
	        var data = google.visualization.arrayToDataTable([
	          ['vCPU', ''],
	          ['Used',  used],
	          ['Available', total-used]
	        ]);

	        var options = {
	          title: '',
	          pieHole: 0.8,
	          colors: ['#009688', '#efefef', '#efefef', '#efefef', '#efefef']
	        };
	        var chart = new google.visualization.PieChart(document.getElementById('vCPUschart'));
        	chart.draw(data, options); 
    }

   /* $scope.getMEM = function(){

        $http({
          method  : 'POST',
          url     : 'http://sp.int.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data',
          data:  {
          "name": "vm_mem_perc",
          "start": ""+new Date().toISOString(),
          "end": ""+new Date().toISOString(),
          "step": "20m",
          "labels": [{"labeltag":"exported_instance", "labelid":$routeParams.name}]
          },
          headers : { 'Content-Type': 'application/json' }
         })
          .success(function(data) {
           	
            $scope.vm.current_mem = parseFloat(data.metrics.result[0].values[0][1]);
            
          });

};*/


    $scope.init = function(){
      google.charts.setOnLoadCallback($scope.drawGauges);

      //drawGauges
      //drawCPUS
      //drawMEMS
      //drawRX/TX
      //drawDISC
      

    	/*$scope.getCPU();
    	$scope.getMEM();
    	$scope.getLineGraph();*/
    	
    	$scope.FillCPUGraph();
    	 /*setInterval(function() {
          $scope.FillCPUGraph();
        }, 5000);*/
    	
    }

     
    
}]);
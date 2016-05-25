SonataApp.controller('HomepageController',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	

$.ajax({
  type: "POST",
  url: $scope.api_url,
  data: {
        "name": "vms_sum",
        "start": "2016-03-28T00:00:00.000Z",
        "end": "2016-03-28T23:40:00.000Z",
        "step": "60s"
        },
  success: function(msg){
    console.log(msg);
  }
});




	$scope.vCPUschart = function(){

		google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
      	$scope.totalCPUs = 50;
      	$scope.usedCPUs = 15;
        
        var data = google.visualization.arrayToDataTable([
          ['vCPUs', ''],
          ['Used',     $scope.usedCPUs],
          ['Available',      $scope.totalCPUs-$scope.usedCPUs]
        ]);

        var options = {
          title: '',
          pieHole: 0.8,
          colors: ['#009688', '#efefef', '#efefef', '#efefef', '#efefef']
        };


        var data2 = google.visualization.arrayToDataTable([
          ['vCPUs', ''],
          ['Used',     $scope.usedCPUs],
          ['Available',      $scope.totalCPUs-$scope.usedCPUs]
        ]);

        var options2 = {
          title: '',
          pieHole: 0.8,
          colors: ['#009688', '#efefef', '#efefef', '#efefef', '#efefef']
        };

        var data3 = google.visualization.arrayToDataTable([
          ['vCPUs', ''],
          ['Used',     $scope.usedCPUs],
          ['Available',      $scope.totalCPUs-$scope.usedCPUs]
        ]);

        var options3 = {
          title: '',
          pieHole: 0.8,
          colors: ['#009688', '#efefef', '#efefef', '#efefef', '#efefef']
        };
        
        var data4 = google.visualization.arrayToDataTable([
          ['vCPUs', ''],
          ['Used',     $scope.usedCPUs],
          ['Available',      $scope.totalCPUs-$scope.usedCPUs]
        ]);

        var options4 = {
          title: '',
          pieHole: 0.8,
          colors: ['#009688', '#efefef', '#efefef', '#efefef', '#efefef']
        };


        var chart = new google.visualization.PieChart(document.getElementById('vCPUschart'));
        var chart2 = new google.visualization.PieChart(document.getElementById('vCPUschart2'));
        var chart3 = new google.visualization.PieChart(document.getElementById('vCPUschart3'));
        var chart4 = new google.visualization.PieChart(document.getElementById('vCPUschart4'));
        chart.draw(data, options);        
        chart2.draw(data2, options2);        
        chart3.draw(data3, options3);        
        chart4.draw(data4, options4);        

      }
	}



	$scope.getRamChart = function(){

      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
      	$scope.totalRam = 20;
      	$scope.usedRam = 15;
        var data = google.visualization.arrayToDataTable([
          ['Ram', 'MB'],
          ['Used',     $scope.usedRam],
          ['Available',      $scope.totalRam-$scope.usedRam]
        ]);

        var options = {
          title: '',
          pieHole: 0.8,
          colors: ['#3D4051', '#efefef', '#efefef', '#efefef', '#efefef'],
          width:400,
          height:400,
        };

        var chart = new google.visualization.PieChart(document.getElementById('ramchart'));
        chart.draw(data, options);
      }
	}





	$scope.getLineGraph = function(){

		
		google.charts.setOnLoadCallback(drawBackgroundColor);

		function drawBackgroundColor() {
      
	      var data = new google.visualization.DataTable();
	      data.addColumn('number', 'X');
	      data.addColumn('number', 'Y');

	      data.addRows([
	        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
	        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
	        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
	        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
	        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
	        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
	        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
	        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
	        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
	        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
	        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
	        [66, 70], [67, 72], [68, 75], [69, 80]
	      ]);
        
        var m = 70;
	      var options = {
	        hAxis: {
	          title: 'Time'
	        },
	        vAxis: {
	          title: 'Popularity'
	        },
	        backgroundColor: '#ffffff',

	      };



	      var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
	      chart.draw(data, options);
        var x=69;
        setInterval(function(){
          x+=1;
          data.addRows([[x,Math.random()*100]]);
          chart.draw(data,options);
        }, 100000000);
    	}
	}

    $scope.init = function(){
      

    	$scope.getLineGraph();
    	/*$scope.getRamChart();*/
    	$scope.vCPUschart();
    	
    }

     
    
}]);
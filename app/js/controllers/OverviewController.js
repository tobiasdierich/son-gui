SonataApp.controller('OverviewController',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
  console.log('OverviewController Called');
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
          title: 'vCPUs',
          pieHole: 0.4,
          colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        };

        


        var chart = new google.visualization.PieChart(document.getElementById('vCPUschart'));
        chart.draw(data, options);
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
          title: 'RAM',
          pieHole: 0.4,
          colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
          width:400,
          height:400,
          is3D: true
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
        data.addColumn('number', 'Dogs');

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
      }
  }

    $scope.init = function(){

      
      $scope.getLineGraph();
      $scope.getRamChart();
      $scope.vCPUschart();
      
    }

     
    
}]);
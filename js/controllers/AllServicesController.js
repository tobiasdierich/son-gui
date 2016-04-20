SonataApp.controller('AllServicesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.userServices = new Array();
           $scope.selected_services = new Array();
           $scope.remove_class_btn='disabled';
           
           $scope.getServices = function(){
            console.log('dasdasdasdsadsa');
             $http({
                method  : 'GET',
                url     : 'http://sp.int.sonata-nfv.eu:32001/services',
                headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
               })
                .success(function(data) {
                  console.log(data);
                  $scope.services = data;
                 /*$scope.services = JSON.parse(jQuery.parseJSON(data));

                 console.log(typeof($scope.services));
                 console.log(jQuery.parseJSON(data));
                 */ 
                })
                .error(function(data){
                  alert(data);
                })
           }

           $scope.userServices.push({
           	'id':1,
            'checked':false,
           	'name':'Service One',
           	'version':'Service version',
           	'description':'Service Description',
           	'status':'Service Status',
           });
           $scope.userServices.push({
           	'id':2,
            'checked':false,
           	'name':'Service Two',
           	'version':'Service version Two',
           	'description':'Service Description Two',
           	'status':'Service Status Two',
           });
           $scope.userServices.push({
           	'id':3,
            'checked':false,
           	'name':'Service Three',
           	'version':'Service version Three',
           	'description':'Service Description Three',
           	'status':'Service Status Three',
           });
           $scope.userServices.push({
            'id':4,
            'checked':false,
            'name':'Service Four',
            'version':'Service version Four',
            'description':'Service Description Four',
            'status':'Service Status Four',
           });
           $scope.userServices.push({
            'id':5,
            'checked':false,
            'name':'Service Five',
            'version':'Service version Five',
            'description':'Service Description Five',
            'status':'Service Status Five',
           });

           $scope.openServiceInfo = function(service){
             $('#modal1').openModal();
             console.log(service);
             $scope.modal = {};
             $scope.modal.content = {};
             $scope.modal.content.title=service.name;
             $scope.modal.content.service = service;
           }

          $scope.openServiceGraphs = function(service){
             $('#modal1').openModal();
             console.log(service);
             $scope.modal = {};
             $scope.modal.content = {};
             $scope.modal.content.title=service.name;
             $scope.modal.content.service = service;
             
          }
          $scope.closeModal = function(){
             $('#modal1').closeModal(); 
          }
        

          $scope.remakeChecked = function(service){

            $scope.selected_services = new Array();
            $scope.userServices.forEach( function(service, index) {
              if(service.checked){
                $scope.selected_services.push(service);
              }
            });
              if($scope.selected_services.length>0)
                $scope.remove_class_btn = 'enabled';
              else
                $scope.remove_class_btn = 'disabled';
          }


           
}]);
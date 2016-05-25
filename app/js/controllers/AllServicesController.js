SonataApp.controller('AllServicesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.userServices = new Array();
           $scope.selected_services = new Array();
           $scope.remove_class_btn='disabled';
           
           $scope.getServices = function(){
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
                  console.error(data);
                })
           }


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
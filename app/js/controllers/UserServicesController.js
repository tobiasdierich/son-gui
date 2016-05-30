SonataApp.controller('UserServicesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.userServices = new Array();
           $scope.selected_services = new Array();
           $scope.remove_class_btn='disabled';
           

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
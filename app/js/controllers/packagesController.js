SonataApp.controller('PackagesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.getPackages = function(){
            console.info('Get Packages call started. Url:'+$scope.apis.gatekeeper.packages);
             $http({
                method  : 'GET',
                url     : $scope.apis.gatekeeper.packages,
                headers : {"Content-Type":"application/zip"}
               })
                .success(function(data) {
                  console.info('Get Packages From Url: '+$scope.apis.gatekeeper.packages);
                  var blob=new Blob([data], {
                              type: 'application/zip' //or whatever you need, should match the 'accept headers' above
                          });
                  $scope.pack = {};
                  $scope.pack.href = window.URL.createObjectURL(blob);
                  $scope.pack.filename = "packages.zip";
                  $scope.pack.show = true;
                  var zip = new JSZip();
                  zip.file("Hello.txt", "Hello World\n");
                  var img = zip.folder("images");
                  zip.file(data, {base64: true});
                  zip.generateAsync({type:"blob"})
                  .then(function(content) {
                      
                      saveAs(content, "example.zip");
                    });
                })
                .error(function(data){
                  console.error('Get Packages Failed. Get Url: '+$scope.apis.gatekeeper.packages);
                  console.error(data);
                })
           }




           
}]);
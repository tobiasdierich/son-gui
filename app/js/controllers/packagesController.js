SonataApp.controller('PackagesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.getPackages = function(){
             $http({
                method  : 'GET',
                url     : 'http://sp.int.sonata-nfv.eu:32001/packages',
                headers : {"Content-Type":"application/zip"}
               })
                .success(function(data) {
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
    // see FileSaver.js
    saveAs(content, "example.zip");
});



                 /*$scope.services = JSON.parse(jQuery.parseJSON(data));

                 console.log(typeof($scope.services));
                 console.log(jQuery.parseJSON(data));
                 */ 
                })
                .error(function(data){
                  console.error(data);
                })
           }




           
}]);
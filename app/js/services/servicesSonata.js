SonataApp.service('servicesSonata',['$scope','$http', function($scope,$http) {
    
        var servicesSonata = $resource('http://148/:id', { }, {
            query: {
                headers: { 'Content-Type': 'application/json' }
            }
        });
        return servicesSonata;


}]);



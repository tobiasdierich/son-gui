SonataApp.factory('Monitoring', function($http){
    
        return{
            getData:function(url){
                return $http({
                    url:url,
                    method:'GET'
                })
            }                      
        }
       
});

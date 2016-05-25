if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}

var SonataApp = angular.module('SonataApp', ['ngRoute','ui.materialize']);
   


SonataApp.config(function($routeProvider) {
		$routeProvider
			.when('/user/profile', {
				templateUrl : 'js/views/settings/user_profile.html',
				controller  : 'MainController'
			})
			.when('/user/settings', {
				templateUrl : 'js/views/settings/user_settings.html',
				controller  : 'MainController'
			})
			.when('/catalogue/userServices', {
				templateUrl : 'js/views/catalogue/user_services.html',
				controller  : 'MainController'
			})
			.when('/catalogue/allServices', {
				templateUrl : 'js/views/catalogue/all_services.html',
				controller  : 'MainController'
			})
			.when('/catalogue/packages', {
				templateUrl : 'js/views/catalogue/packages.html',
				controller  : 'MainController'
			})
			.when('/instances/overview', {
				templateUrl : 'js/views/instances/overview.html',
				controller  : 'MainController'
			})
			.when('/instances/userServices', {
				templateUrl : 'js/views/instances/user_services.html',
				controller  : 'MainController'
			})
			.when('', {
				templateUrl : 'js/views/monitoring/service_platform.html',
				controller  : 'MainController'
			})
			.when('/signup', {
				templateUrl : 'js/views/signup.html',
				controller  : 'MainController'
			})
			.when('/login', {
				templateUrl : 'js/views/login.html',
				controller  : 'MainController'
			})
			.when('/monitoring/platform',{
				templateUrl	: 'js/views/monitoring/service_platform.html',
				controller 	: 'MainController'
			})
			.when('/monitoring/vnfs',{
				templateUrl	: 'js/views/monitoring/vnfs.html',
				controller 	: 'MainController'
			})
			.when('/vnf/:name',{
				templateUrl	: 'js/views/monitoring/vnf.html',
				controller 	: 'MainController'
			})
			.when('/vm/:name',{
				templateUrl	: 'js/views/monitoring/vm.html',
				controller 	: 'MainController'
			})
			.when('/container/:id',{
				templateUrl	: 'js/views/monitoring/container.html',
				controller 	: 'MainController'
			})
			
		$routeProvider.otherwise({
			templateUrl:'js/views/monitoring/service_platform.html',
			controller :'MainController'
		});
	console.log($routeProvider);



	});


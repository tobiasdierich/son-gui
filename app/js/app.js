/*
Copyright (c) 2015 SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
ALL RIGHTS RESERVED.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Neither the name of the SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written 
permission.

This work has been performed in the framework of the SONATA project,
funded by the European Commission under Grant number 671517 through 
the Horizon 2020 and 5G-PPP programmes. The authors would like to 
acknowledge the contributions of their colleagues of the SONATA 
partner consortium (www.sonata-nfv.eu).
*/

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}

var SonataApp = angular.module('SonataApp', ['ngRoute','ui.materialize','highcharts-ng']);
   


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
			.when('/catalogue/functions', {
				templateUrl : 'js/views/catalogue/functions.html',
				controller  : 'MainController'
			})
			.when('/vim_settings', {
				templateUrl : 'js/views/settings/vim.html',
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
			.when('/alerts', {
				templateUrl : 'js/views/alerts.html',
				controller  : 'MainController'
			})
			.when('', {
				templateUrl : 'js/views/dashboard.html',
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
			.when('/catalogue/kpis',{
				templateUrl	: 'js/views/catalogue/kpis.html',
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
			templateUrl:'js/views/dashboard.html',
			controller :'MainController'
		});
	console.log($routeProvider);



	});



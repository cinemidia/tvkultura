angular.module('app')
	.config(config);
	
	config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) 
	{
        $stateProvider
            .state('logout', {
                url:'/logout',
                controller: 'LogoutController'                
            });
(function()
{
	angular.module('app')
	.config(config);
	
	config.$inject = ['$stateProvider','$locationProvider','$urlRouterProvider'];
    function config($stateProvider,$locationProvider,$urlRouterProvider) 
	{   
        //$locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode(true);
        $stateProvider
		.state('home', {
		  url: "/index:action",
		  views: {
                "body": {
                    templateUrl: "app/components/video/video.player.view.html",
					controller:'VideoPlayerController',
					controllerAs: 'vm'
                }
            }
		})
        .state('video', {
            url: "/v/:action",
            views: {
                "body": {
                    templateUrl: "app/components/video/video.player.view.html",
					controller:'VideoPlayerController',
					controllerAs: 'vm'
                }
            }
        })
		.state('videos', {
            url: "/vs",
            views: {
                "body": {
                    templateUrl: "app/components/video/video.list.view.html",
					controller:'VideoListController',
					controllerAs: 'vm'
                }
            }
        })
		.state('login', {
            url: "/lg/:action",
            views: {
                "body": {
                    templateUrl: "app/components/login/login.view.html",
					controller:'LoginController',
					controllerAs: 'vm'
                }
            }
        })
        .state('register', {
            url: "/rgt",
            views: {
                "body": {
                    templateUrl: "app/components/login/register.view.html",
                    controller:'LoginController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('category', {
            url: "/ctg/:action",
            views: {
                "body": {
                    templateUrl: "app/components/video/category.view.html",
                    controller:'VideoPlayerController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('live', {
            url: "/lv",
            views: {
                "body": {
                    templateUrl: "app/components/video/live.view.html"                  
                }
            }
        })
        .state('sobre', {
            url: "/sb",
            views: {
                "body": {
                    templateUrl: "app/components/sobre/sobre.view.html"                  
                }
            }
        });
         $urlRouterProvider.otherwise('/index');
    }	
})();
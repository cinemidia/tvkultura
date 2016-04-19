(function () {
    'use strict';
	
	angular.module('app')
	.controller('LoginController',LoginController);

    LoginController.$inject = ['$rootScope','$location','UserService','AuthenticationService', 'FlashService', '$state', '$stateParams'];
    function LoginController($rootScope,$location,UserService, AuthenticationService, FlashService, $state, $stateParams) 
	{
		
		var vm = this;
		vm.username;
		vm.password;
		vm.login = login;
		vm.logout= logout;
		vm.register= register;		
		
       (function initController() 
	   {
			var action = $stateParams.action;
			
			switch (action)
			{
				case 'logout':
					logout();
					break;
				
				case 'register':
					register()
					break;
				
				default:
					AuthenticationService.ClearCredentials();
			}
       })();
        
        function login() 
		{
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) 
			{
                if (response.success) 
				{  					
                   AuthenticationService.SetCredentials(vm.username, vm.password);             
                   $location.path('/vs');
                   $rootScope.ver_logout = true;
                   $rootScope.userLogged=vm.username;
                   $rootScope.lg=false;
		           $rootScope.ad=true;
                } else 
				{
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function logout(){   
          AuthenticationService.ClearCredentials();         
          $location.path('/index/');
          $rootScope.ver_logout = false;
          $rootScope.lg=true;
		  $rootScope.ad=false;
        }
		
		
		function register() 
		{			
            vm.dataLoading = true;
            UserService.Create(vm.user).then(function (response) 
			{
				if (response.success) 
				{
					FlashService.Success('Registration successful', true);
					$location.path('/login/');
				}
				 else 
				{
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
            });
        }
    }

})();

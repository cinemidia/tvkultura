(function() { 'use strict';

	angular.module('app')
	.directive('mainMenu', MainMenu);
	MainMenu.$inject = ['ngDialog'];
	
	function MainMenu(ngDialog)
	{
		return {
		  restrict: 'E',
		  replace: 'true',
		  controller:'VideoPlayerController',
		  controllerAs:'vm',
		  templateUrl: 'app/components/menu/menu.view.html'
		};
	}
})();
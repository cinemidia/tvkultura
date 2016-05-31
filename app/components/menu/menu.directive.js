(function() { 'use strict';

	angular.module('app')
	.directive('mainMenu', MainMenu);	

	  /** Esta funcão sera chamada automaticamente 
	    * assim que a diretiva mainMenu é executada no HTML.
        * @name MainMenu
        * @function
        */
      /** 
       * @param {MainMenu} 
      */
	function MainMenu()
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
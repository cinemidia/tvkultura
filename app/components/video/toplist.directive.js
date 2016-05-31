(function () { 'use strict';

	angular.module('app')
	.directive('topList', TopList);
	
     /** Esta funcão sera chamada automaticamente 
	    * assim que a diretiva topList é executada no HTML.
        * @name TopList
        * @function
        */
      /** 
       * @param {TopList} 
      */
	function TopList()
	{
		return {
		  restrict: 'E',
		  replace: 'true',
		  templateUrl: 'app/components/video/toplist.template.html'
		};
	}

})();
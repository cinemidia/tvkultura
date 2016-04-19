(function () { 'use strict';

	angular.module('app')
	.directive('topList', TopList);
	
	function TopList()
	{
		return {
		  restrict: 'E',
		  replace: 'true',
		  templateUrl: 'app/components/video/toplist.template.html'
		};
	}

})();
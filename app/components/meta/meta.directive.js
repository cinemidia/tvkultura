(function() { 'use strict';

	angular.module('app')
	.directive('videoMetaInfo',videoMetaInfo);
	
	function videoMetaInfo()
	{
		return {
			restrict: 'E',
			replace: 'true',
			scope: {},
			controller:'VideoPlayerController',
			controllerAs:'vm',
			templateUrl: 'app/components/meta/meta.template.html',
			link: function(scope, elem, attrs) 
			{
				scope.collapseMeta = true;
				scope.showMeta = true;
				
				elem.bind('click', function() 
				{
					scope.$apply(function() 
					{
						scope.showMeta = false;
					
					});
				});
				
				elem.bind('mouseenter', function() 
				{
					elem.css('cursor', 'pointer');
					scope.$apply(function() 
					{
						scope.collapseMeta = false;
					
					});
				});
				
				elem.bind('mouseleave', function() 
				{
					elem.css('cursor', 'normal');
					scope.$apply(function() 
					{
						scope.collapseMeta = true;
					
					});
				});
				
			}
		};
	}
})();
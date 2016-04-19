(function()
{			
	angular.module('app', [
		"ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.poster",
        "info.vietnamcode.nampnq.videogular.plugins.youtube",
		"ngDialog",
		"ui.router",
		"ngAnimate",
		'ngCookies','720kb.socialshare',
		'uk.ac.soton.ecs.videogular.plugins.cuepoints'
	])
	.factory('dataService', dataService);
	
	dataService.$inject = ['$http','$q'];
	function dataService($http,$q)
	{
		var service = {};
		var cachedData = null; 
		service.getData = getData;
		service.clearCache = clearCache;
		service.getYoutubeData = getYoutubeData;
		service.postData = postData;
		return service; 
		
		
		function getData(url) 
		{
			var d = $q.defer();
			
			if(cachedData) 
			{
				d.resolve(cachedData);
			}
			else 
			{
				httpHeader = { 
					method: 'GET',
					url: url,
					headers: { 'Accept-Charset': 'application/json;charset=utf-8'}
				}; 
				
				$http(httpHeader)
				.then(function successCallback(response) 
				{
					cachedData = response.data;
					d.resolve(cachedData);
				}, function errorCallback(response) 
				{
					d.reject(reason);
				});
			}
			return d.promise;
		}
		
		
		function getYoutubeData(url) 
		{

			httpHeader = { 
				method: 'GET',
				url: url,
				headers: { 'Accept-Charset': 'application/json;charset=utf-8'}
			}; 
			
			return $http(httpHeader);
		}
		
		
		// http post method
		function postData(url,postData)
		{
			httpHeader = {
				method: 'POST',
				url: url,
				data: postData
			}
			return $http(httpHeader);
		}
		//
		
		
		function clearCache()
		{
			cachedData = null;
		}
	}
	
})();
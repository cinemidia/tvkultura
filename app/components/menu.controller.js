(function()
{
	angular
    .module('tvApp')
    .controller('MainCtrl', MainCtrl);
	
	MainCtrl.$inject = ['$scope', 'ngDialog', '$timeout'];
	function MainCtrl($scope, ngDialog, $timeout)
	{
		$scope.mainTeste = "mainTeste";
		
		$scope.openDialog = function (dialogId) 
		{
			ngDialog.open(
			{ 
				template: dialogId,
				controller: 'adminCtrl',
				appendTo: '#wrapper'
			});
		}
	}
	
});
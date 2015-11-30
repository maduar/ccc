angular.module('myApp').
	controller('headController', ['$scope', function($scope) {
		$scope.init = function() {
			$scope.LOGIN = (window.member) ? true : false;
		}
	}]);
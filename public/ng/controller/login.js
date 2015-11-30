angular.module('myApp')
	.controller('login', ['$scope', '$http', '$state',function( $scope, $http, $state) {
		$scope.init = function() {
			console.log('login');
		}
		
		$scope.login = {};
		$scope.login.user = "";
		$scope.login.password = "";
		
		$scope.userLogin = function () {
			//var data = { user : "admin", password : "admin"} ;
			$http.post('/login', $scope.login ).
				success(function(data,status,headers,config){
					console.log($scope.login);
					if(data.code == 0)  {
						//后台未能删掉密码
						delete data.content.password;
						window.member = data.content;
						alert("登陆成功，点击跳转到首页");
						$state.go('index', {}, true);
					}else {
						$scope.login.password = "";
						alert(data.content);
					}
				}).				
				error(function(data,status,headers,config){
					alert("登陆超时");
				});
		}
		
	}]);
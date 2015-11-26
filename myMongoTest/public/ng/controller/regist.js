angular.module('myApp')
	.controller('regist', ['$scope', '$http', '$state',function($scope, $http, $state) {
		$scope.init = function() {
			console.log('regist');
		}
		
		
		$scope.regist = {};
		$scope.regist.user = '';
		$scope.regist.password = '';
		$scope.regist.dpassword = '';
		$scope.regist.email = '';
		$scope.regist.phone = '';
		$scope.regist.create_date = new Date();
		
				
		$scope.userRegist = function () {
			//var data = { user : "admin", password : "admin"} ;
			
			if($scope.regist.password != $scope.regist.dpassword) {
				//$scope.regist.password = '';
				$scope.regist.dpassword = '';
				return alert("两次输入的密码不一致");
			}
			
			delete $scope.regist.dpassword;
			
			$http.post('/regist', $scope.regist ).
				success(function(data,status,headers,config){
					console.log($scope.regist);
					if(data.state == 'sucess')  {
						alert(data.content);
						$state.go('login', {}, true);
					}else {
						
						alert(data.content);
					}
				}).				
				error(function(data,status,headers,config){
					alert("登陆超时");
				});
		}		
		
		
	}]);
	
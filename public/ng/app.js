angular.module('myApp', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
	  //
	  // For any unmatched url, redirect to /state1
	  $urlRouterProvider.otherwise("/index");
	  //
	  // Now set up the states
	  $stateProvider
		.state('index', {
		  url: "/index",
		  templateUrl: "ng/views/index.html",
		  title : '首页'
		})
		.state('login', {
		  url: "/login",
		  templateUrl: "ng/views/login.html"
		})
		.state('regist', {
		  url: "/regist",
		  templateUrl: "ng/views/regist.html"
		});
	});
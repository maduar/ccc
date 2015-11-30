angular.module('myApp')
	.controller('index', [ '$scope', '$http', function($scope, $http) {
		$scope.init = function() {
			//$scope.login ? window.member=$scope.login : null;
			//console.log(window.member);
			if( window.member ) {
				alert('欢迎 ' + window.member.user + '回来');
				console.log('====' + window.member);
			}
			//(window.member) ? alert(JSON.stringify(window.member)) : null;
		}
		
		

		
		$scope.blogs = [
			{ title : 'first1', content : 'hhhhhhhhhhhhhhhhh', auth : 'aaa', date : '2015-11-25 00:00:00'},
			{ title : 'first2', content : 'hhhhhhhhhhhhhhhhh', auth : 'bbb', date : '2015-11-25 00:00:00'},
			{ title : 'first3', content : 'hhhhhhhhhhhhhhhhh', auth : 'ccc', date : '2015-11-25 00:00:00'},
			{ title : 'first4', content : 'hhhhhhhhhhhhhhhhh', auth : 'ddd', date : '2015-11-25 00:00:00'},
			{ title : 'first5', content : 'hhhhhhhhhhhhhhhhh', auth : 'eee', date : '2015-11-25 00:00:00'},
			{ title : 'first6', content : 'hhhhhhhhhhhhhhhhh', auth : 'fff', date : '2015-11-25 00:00:00'},
			{ title : 'first7', content : 'hhhhhhhhhhhhhhhhh', auth : 'ggg', date : '2015-11-25 00:00:00'},
			{ title : 'first8', content : 'hhhhhhhhhhhhhhhhh', auth : 'hhh', date : '2015-11-25 00:00:00'},
			{ title : 'first9', content : 'hhhhhhhhhhhhhhhhh', auth : 'iii', date : '2015-11-25 00:00:00'},
			{ title : 'first10', content : 'hhhhhhhhhhhhhhhhh', auth : 'jjj', date : '2015-11-25 00:00:00'},
			{ title : 'first11', content : 'hhhhhhhhhhhhhhhhh', auth : 'kkk', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'lll', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'yyy', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'tttt', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'ppp', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'ttt', date : '2015-11-25 00:00:00'},
			{ title : 'first', content : 'hhhhhhhhhhhhhhhhh', auth : 'rrrr', date : '2015-11-25 00:00:00'}		
		]
		
		
		//console.log($scope.blogs.slice(10,2));
		//分页   pages  all   |  page curr   | count pages per page
		$scope.count = 10;
		$scope.pages =( ( $scope.blogs.length % $scope.count ) == 0 )   ?   parseInt( $scope.blogs / $scope.count ) : parseInt( ($scope.blogs.length /$scope.count) + 1 ) ;
        $scope.page = 1;
        
		$scope.indexBlog = $scope.blogs.slice(0, $scope.count);
		//console.log('index blog : ' + $scope.indexBlog);
		//console.log('index blog : ' + $scope.blogs.slice(10, $scope.count));
		
		
        $scope.selectPage = function(nowPage){
			$scope.startIndex = ( nowPage - 1 ) ? ( nowPage - 1 ) * $scope.count : 0;
			//$scope.endIndex = ( nowPage ==  $scope.pages ) ? ( $scope.blogs.length % $scope.count ) :  $scope.count ;
			$scope.indexBlog = $scope.blogs.slice( $scope.startIndex, $scope.count );
           //console.log("选择的页："+nowPage);  
        };		
		
	}])
	
	.directive('pagination', function(){
    return {
        restrict: 'E',
        scope: {
            numPages: '=',     
            currPage: '=',
            onSelectPage: '&'
        },
        
        template: '<ul class="pagination">'
            +'<li ng-class="{disabled: noPreviousPage()}">'
            +'<a ng-click="selectPreviousPage()">上一页</a>'
            +'</li>'
            
            +'<li ng-repeat="page in pages" ng-class="{active: isActivePage(page)}">'
            +'<a ng-click="selectPage(page)">{{page}}</a>'
            +'</li>'
            
            +'<li ng-class="{disabled: noNextPage()}">'
            +'<a ng-click="selectNextPage()">下一页</a>'
            +'</li>'
    
            +'</ul>',
    
        replace: true,
        link: function(s){
            s.$watch('numPages', function(value){
                s.pages = [];
                
                for(var i=1;i<=value;i++){
                    s.pages.push(i);
                }
                
                if(s.currPage > value){
                    s.selectPage(value);
                }
            });
            
            //判读是否有上一页
            s.noPreviousPage = function(){
                return s.currPage === 1;
            };
            
            //判断是否有下一页
            s.noNextPage = function(){
                return s.currPage === s.numPages;
            };
            
            //判断当前页是否被选中
            s.isActivePage = function(page){
                return s.currPage===page;
            };
            
            //选择页数
            s.selectPage = function(page){
                if(!s.isActivePage(page)){
                    s.currPage = page;
                    
                    s.onSelectPage({ page:page });
                }
            };
            
            //选择下一页
            s.selectNextPage = function(){
                if(!s.noNextPage()){
                    s.selectPage(s.currPage+1);
                }
            };
            
            //选择上一页
            s.selectPreviousPage = function(){
                if(!s.noPreviousPage()){
                    s.selectPage(s.currPage-1);
                }
            };
        }
    };
});
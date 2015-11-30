var express = require('express');
var router = express.Router();
var Modules = require('./../db/mongodb.js');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  // add session is failed
  //req.session.member = 'aaa';
  //console.log('req.session : ' +res.cookie) ;
  //console.log('req.session : ' +JSON.stringify(req.session)) ;
  var _toRenderIndex = {};
  var _member = (req.session.member) ? req.session.member : null;
  if(_member)  delete _member.password;
  _toRenderIndex.account = _member;
  _toRenderIndex.title = '博客首页';
  res.render('index', _toRenderIndex);
});




router.get('/count', function(req, res, next) {
	console.log('cookie : ' + req.headers.cookie);
	Modules.userlist.count({}, function(err, result) {
		if(err)  throw err;
		console.log('count : ' + result);
		var _result = { code:0, state : "sucess", msg : "Ok", result : result };
		res.send(_result);
	});
})

//获取单个userlist
router.get('/getUserList', function(req, res, next) {
	Modules.userlist.findOne({}, function(err, result) {
		if(err)  throw err;
		console.log('count : ' + result.password);
		var _result = { code:0, state : "sucess", msg : "Ok", content : result };
		delete _result.content.password;
		console.log('deleted : ' + JSON.stringify(_result) );
		res.send(_result);
	});
})


//login
router.post('/login', function(req, res, next) {
	    // 检查 session 中的 isVisit 字段是否存在
    // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。

	
	
	
	//console.log('cookie : ' + JSON.stringify(req.body) );
	var data = { user : req.body.user, password : req.body.password} ;
	
	console.log(data);
	Modules.userlist.findOne( data, function(err, result) {
		if(err)  { console.err('err ' + err) };
		if( result ) {
			var _result = { code:0, state : "sucess", msg : "sucess", content : result };
			req.session.member = result;
			res.send(_result);			
		} else {
			var _result = { code:2000, state : "fail", msg : "fail", content : "用户名或者密码错误" };
			res.send(_result);			
		}

	});
})

//regist
router.post('/regist', function(req, res, next) {
	//console.log(JSON.stringify(req.body) );
	
	var data = req.body;
	//res.send({ code:0, state : "sucess", msg : "sucess", content : "注册成功" });
	
	Modules.userlist.count( {user : req.body.user}, function(err, result) {
		if(err)  { console.err('err ' + err) };
		
		if( result != 0) {
			console.log(JSON.stringify(result));
			res.send({ code:2000, state : "fail", msg : "fail", content : "用户已存在，请更换用户名" });			
		} else {
			//res.send({ code:0, state : "sucess", msg : "sucess", content : "注册成功" });
			var moduleEntity = new Modules.userlist(data);
			moduleEntity.save(function(err) {
				if (!err) {
					var _result = { code:0, state : "sucess", msg : "sucess", content : "注册成功" };
			        res.send(_result);
				} else {
					var _result = { code:2000, state : "fail", msg : "fail", content : "保存数据失败！" };
					res.send(_result);					
				}				
			})		    
		}

	});
	
})


module.exports = router;

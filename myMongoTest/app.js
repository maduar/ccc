var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var http = require('http');
var ejs = require('ejs');

var config = require('./routes/config/config');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

global.config = config;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.set('port', app.config.server.port || 3000);

app.use('/', routes);
app.use('/users', users);

app.get('/api00', function(req, res) {
	res.send('hahahksdfhkl');
});


app.post('/login', routes);
app.post('/home', routes);
//app.get('/getUserList', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	//app.set('trust proxy', 1) ;
	//sess.cookie.secure = true 
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



//app.use(session(sess));
app.listen(config.port, function() {
	console.log('Start ' + config.port);
})

module.exports = app;

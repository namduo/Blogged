var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');

// ROUTES
var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');

var userBlog = require('./routes/userBlog');
var addBlog = require('./routes/addBlog');
var userPage = require('./routes/userPage');
var allBlogs = require('./routes/allBlogs');
var shareBlog = require('./routes/shareBlog');


// API ROUTES
var API_removeBlog = require('./routes/API_removeBlog');
var API_getBlog = require('./routes/API_getBlog');
var API_updateBlog = require('./routes/API_updateBlog');
var API_getAllBlogs = require('./routes/API_getAllBlogs');





var app = express();


// Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Blogged')
var db = mongoose.connect();

// Session for tracking logging
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

app.use('/userPage', userPage);
app.use('/allBlogs', allBlogs);
app.use('/userBlog', userBlog);
app.use('/addBlog', addBlog);
app.use('/shareBlog', shareBlog);

app.use('/API_removeBlog', API_removeBlog);
app.use('/API_getBlog', API_getBlog);
app.use('/API_updateBlog', API_updateBlog);
app.use('/API_getAllBlogs', API_getAllBlogs);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

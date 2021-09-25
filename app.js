var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var uri = "mongodb+srv://Itayn:itay123@cluster0.okz2l.mongodb.net/projectDB?retryWrites=true&w=majority";


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expensesRouter = require('./routes/expenses');
var loginRouter = require('./routes/login');

var app = express();

//Set up mongoose connection
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true},() => console.log('connected to DB!'));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userProfile', usersRouter);
app.use('/expenses', expensesRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

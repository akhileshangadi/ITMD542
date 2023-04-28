var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const betterSqlite3 = require('better-sqlite3');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const dbUsers = new betterSqlite3(path.join(__dirname, '/data/databaseUsers.sqlite'), {verbose: console.log});
const stmt = dbUsers.prepare("CREATE TABLE IF NOT EXISTS USER_LOGIN_CREDENTIALS (ID	INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, EMAIL TEXT UNIQUE)")
stmt.run();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
const authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'my secret session',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/', authRouter);

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

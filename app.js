const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log4js = require('./log');

const {expressjwt:jwt} = require("express-jwt");

const config = require('./config')

const mongoose = require('./mongodb/index.js')
mongoose()

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const linkRouter = require('./routes/link');
const uploadRouter = require('./routes/upload');
const categoryRouter = require('./routes/category');

const app = express();
log4js.use(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Max-Age", 86400)
  next();
});

app.use(
  jwt({ secret: config.jwt.secret, algorithms: ['HS256'], credentialsRequired: false}).unless({path: ['/user/login']})
);
app.use((err, req, res, next)=>{
  if (err.name === "UnauthorizedError") {
      return res.json({
        code: 401,
        data: null,
        message: 'token失效或过期'
      });
  } else {
    next(err);
  }
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/link', linkRouter);
app.use('/category', categoryRouter)
app.use('/upload', uploadRouter)

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

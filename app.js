var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config({path:"config.env"})
const db =process.env.monogo

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var productRouter = require('./routes/api/products');
var config= require("config")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({origin:"*",
  methods:["GET","POST","PUT","DELETE"],
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use()



app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);

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


mongoose
.connect(db,
{useNewUrlParser: true})
.then(()=>console.log("Connected to Mongo.."))
.catch((error)=>console.log(error.message));


module.exports = app;

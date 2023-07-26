const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');

// custom controllers
const auth = require('./controllers/auth'); 
const landlord = require('./controllers/landlord');
const student = require('./controllers/student');
const admin = require('./controllers/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// mongoose connection
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const { hasSubscribers } = require('diagnostics_channel');

mongoose.connect(process.env.CONNECTION_STRING).then((res) => {
  console.log('Connected to mongoose');
}).catch(() => {
  console.log('Connection to mongoose failed');
}
)

//passport config
const passport = require('passport');
const session = require('express-session');

// initialize session
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user')
passport.use(User.createStrategy(), )

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use('/', indexRouter);
app.use('/users', usersRouter);

//mapping the requests for custom controllers
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/landlord', landlord);
app.use('/student', student);


// Code help from https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value
const hbs = require('hbs');
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('notEquals', function(arg1, arg2, options) {
  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});


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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var socketIO = require('socket.io');
var autoIncrement = require('mongoose-auto-increment');

var socketHandler = require('./socketHandler');

var config = require('./config');

var index = require('./routes/index');
var api = require('./routes/api');

mongoose.Promise = global.Promise;

//db connect
mongoose.connect(config.db.url);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Succesfully connected to mongodb: ' + config.db.url);
});

var app = express();
var io = socketIO();
app.io = io;

app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//config passport and session
var MongoStore = require('connect-mongo')(expressSession);

var sessionMiddleware = expressSession({secret: 'muchSecret',
                        resave: false,
                        saveUninitialized: false,
                        store: new MongoStore({mongooseConnection: db,
                                               touchAfter: 24 * 3600
                                              })
                       });

app.use(sessionMiddleware);


app.use(passport.initialize());
app.use(passport.session());



var User = require('./schemas/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
app.use((req, res, next) => {
  console.log(req.user);
  next();
});
*/
var account = require('./routes/account');
//routes
app.use('/', index);
app.use('/api', api);
app.use('/account', account);


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

app.use(redirectUnmatched);

//socket 
io.use(function(socket, next){
  sessionMiddleware(socket.request, {}, next);
});

socketHandler.attachIO(io);



module.exports = app;

function redirectUnmatched(req, res) {
  res.redirect("http://localhost:3000/");
}

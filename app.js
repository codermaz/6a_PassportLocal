var express = require('express');
var path = require('path');
// Ein Favicon ist ein sehr kleines, 16×16 oder 32×32 Pixel großes Icon, Symbol oder Logo,
// wie es typischerweise in der Adresszeile eines Webbrowsers links von der URL angezeigt wird. Wikipedia
var favicon = require('serve-favicon');
// morgan: HTTP request logger middleware for node.js
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// passport als Middleware
var passport = require('passport');
var session = require('express-session');


// bneu eingefügte Route info 
var secret = require('./routes/secret');
var info = require('./routes/info');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// log every request to the console
app.use(logger('dev'));
// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// read cookies (needed for auth)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Die Route info mit  routes/info.js "verarbeiten"


// Cookies erlauben
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'any',
    resave: false,
    saveUninitialized: false
}));

// Passport als Middleware einbringen
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions

app.use('/info', info);
// login / Logout
app.use('/login', login);
app.use('/logout', logout);
app.use('/secret', secret);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// so kann die App mit node app.js gestartet werden. Der Server läuft ab hier. 
var port = 3000;
app.listen(port, function () {
    console.log('app listening on port ' + port);
});


module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Config = require('./config/config');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');

// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret:'test-ninja'}));
app.use(passport.initialize());
app.use(passport.session({resave: true, saveUninitialized: true}));
app.use(flash());

// logging system
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// setup the logger
app.use(cookieParser());
app.use(morgan('combined', {stream: accessLogStream}));


// Routes Locations
//var users = require('./routes/user');


// Router Setup
//app.use('/', users);


module.exports = app;
app.use(express.static(path.join(__dirname, '/public')));
require('./config/passport/passport')(passport);
require('./route/routes.js')(app, passport);

// Configure view engine to render EJS templates.
//app.set('views', __dirname + '/views');
//app.set('view engine', 'pug');


// Cros origin for mobile etc.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// DB Setup
mongoose.connect(Config.dbconnect);
var db = mongoose.connection;

//
app.use(passport.initialize());




  // the callback after google has authenticated the user
/*    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/',
                    session: false
            }));
*/

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});

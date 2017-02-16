var express = require('express');
var router = express.Router();
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite');
// var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

var path = require('path');

app.set('views','./views');

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'./public')));

app.use(session({
	resave: false,
	saveUninitialized: true,
	name: config.session.key,
	secret: config.session.secret,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MongoStore({
		url: config.mongodb
	})
}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
routes(app);

app.listen(3000,function(){
	console.log('port:3000');
});

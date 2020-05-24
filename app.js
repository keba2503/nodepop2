var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//conexion con base de datos
const mongooseConnection = require('./lib/connectMongoose');



// prueba i18n
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//conectar con i18n
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);




//Routes API
const login = require('./routes/login');
const jwtAuth = require('./lib/jwtAuth');

app.use('/api/anuncios',jwtAuth(), require('./routes/api/anuncios'));
app.use('/api/loginjwt', login.postJWT);


//Sesion
app.use(session({
  name: 'nodepop-session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  },
  store: new MongoStore({
    mongooseConnection: mongooseConnection
  })

}));


app.locals.title = 'NodePop';

//routes API


// routes Web
const sessionAuth = require('./lib/session');
const basicAuth = require('./lib/basicAuth');

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/web/', sessionAuth(['admin']), require('./routes/web'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/api/', basicAuth(), require('./routes/api/api-docs'));

//login
app.get('/login', login.index);
app.post('/login', login.post);
//logout
app.get('/logout',    login.logout);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.array) { // error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPIRequest(req) ?
      { message: 'Not valid', errors: err.mapped()}
      : `El parámetro ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

module.exports = app;

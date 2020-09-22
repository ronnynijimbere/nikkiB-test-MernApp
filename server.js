const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const helmet = require("helmet");

//CONFIG
const keys = require('./config/keys.js');

//Express MODULES in use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ maxAge: 24 * 60 *60 * 1000, keys: [keys.session.cookieKey]}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'https://mern-task-manager-nikitabatlis.herokuapp.com/',
  credentials: true
}));
app.use(helmet());

//Import ROUTES
const index = require('./routes/index.route.js');
const login = require('./routes/login.route.js');
const signup = require('./routes/signup.route.js');
const dashboard = require('./routes/dashboard.route.js');
const logout = require('./routes/logout.route.js');

//Use routes
app.use('/api', index);
app.use('/api', login);
app.use('/api', signup);
app.use('/api', dashboard);
app.use('/api', logout);

//PROXY PORT
const PORT = process.env.PORT || 5000; 
app.listen(PORT, console.log(`>>> Server is starting on localhost:${PORT} <<<`));

//URI to connect to MongoDB
mongoose.connect(keys.mongoDB.dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('>>> Successfully connected to database <<<<'))
.catch(err => console.log('>>> Database connection error<<<<', err))

// CATCH 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page
  res.status(err.status || 500);
  res.json(err.message);
});

//Change Express’ App.js file to call React build assets
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
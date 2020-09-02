var bodyParser = require("body-parser");
const passport = require("passport");
var favicon = require("serve-favicon");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//var indexRouter = require("./routes/index");
var basicRouter = require("./routes/router");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
var router = express.Router();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
//app.use(favicon(__dirname + "/public/favicon.png"));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "mo-buy-app-react", "build")));
app.use(
  "/SavedItems",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);
app.use(
  "/Market",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);

app.use(
  "/Cart",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);

app.use(
  "/SignIn",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);

app.use(
  "/ViewProductItem",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);

app.use("/", basicRouter);
//app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/*
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const passport = require("passport");
var favicon = require("serve-favicon");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false
});
var router = express.Router();

var indexRouter = require("./routes/index");
var basicRouter = require("./routes/router");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname + "/public/favicon.png"));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  "/1",
  express.static(path.join(__dirname, "mo-buy-app-react", "build"))
);

//app.use("/", indexRouter);
//app.use("/", basicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

*/

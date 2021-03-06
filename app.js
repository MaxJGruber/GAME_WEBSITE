require("dotenv").config();
require("./config/mongodb");
require("./helpers/hbs-helpers");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const indexRouter = require("./routes/home.router");
const usersRouter = require("./routes/users.router");
const usersAdminRouter = require("./routes/users.admin.router");
const gamesRouter = require("./routes/games");
const searchRouter = require("./routes/search");
const myCollectionRouter = require("./routes/myCollection");
// const wishlistRouter = require("./routes/myWishlist");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

// app.use(require("./middleware/protectAdminRoute"))
// app.use(require("./middleware/protectUserRoute"))

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", usersAdminRouter);
app.use("/", gamesRouter);
app.use("/", searchRouter);
app.use(myCollectionRouter);
// app.use("/", wishlistRouter);
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

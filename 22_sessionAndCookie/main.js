"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      dbURL = "mongodb://localhost:27017/",
      dbName = "recipe_db",
      layouts = require("express-ejs-layouts"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController"),
      usersController = require("./controllers/usersController"),
      coursesController = require("./controllers/coursesController"),
      router = express.Router(),
      methodOverride = require("method-override"),
      {check} = require("express-validator"),
      passport = require("passport");


const expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash");

const User = require("./models/user");

mongoose.connect(dbURL+dbName, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");

router.use(layouts);
router.use(express.urlencoded({
  extended: false
}));
router.use(express.json());
router.use(express.static("public"));
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
router.use(cookieParser("secre_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/new", usersController.new);
router.post("/users/create", [
  check('email','Email is invalid').normalizeEmail().trim().isEmail(),
  check('password', 'Password cannot be empty').notEmpty(),
  check('zipCode', 'ZipCode is invalid').notEmpty().isInt().isLength({
    min: 5,
    max: 5
  })
  ],
  usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`The server has started running on port: ${port}`);
})

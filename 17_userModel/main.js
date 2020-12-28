"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      dbURL = "mongodb://localhost:27017/",
      dbName = "recipe_db",
      homeController = require("./controllers/homeController"),
      layouts = require("express-ejs-layouts"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController"),
      usersController = require("./controllers/usersController"),
      router = express.Router(),
      methodOverride = require("method-override");

mongoose.connect(dbURL+dbName, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(layouts);

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use("/", router);
router.get("/", (req, res) => {
  res.send("Welocome to Confetti Cuisine!");
});
router.get("/subscribers", subscribersController.getAllSubscribers);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/contact", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);
router.get("/name/:myName", homeController.respondWithName);
router.get("/course", homeController.showCourses);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`The server has started running on port: ${port}`);
})

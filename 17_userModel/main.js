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
      usersController = require("./controllers/usersController");

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

app.get("/", (req, res) => {
  res.send("Welocome to Confetti Cuisine!");
});
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/name/:myName", homeController.respondWithName);
app.get("/course", homeController.showCourses);
app.get("/users", usersController.index, usersController.indexView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`The server has started running on port: ${port}`);
})

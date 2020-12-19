"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      dbURL = "mongodb://localhost:27017",
      homeController = require("./controllers/homeController"),
      layouts = require("express-ejs-layouts"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController");

mongoose.connect(dbURL, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

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

/*
app.get("/name/:myName", homeController.respondWithName)
   .listen(port, () => {
     console.log(`The server has started running on port: ${port}`);
   });
*/

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`The server has started running on port: ${port}`);
})

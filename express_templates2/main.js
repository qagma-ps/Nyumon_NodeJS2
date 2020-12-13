"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController"),
      layouts = require("express-ejs-layouts"),
      errorController = require("./controllers/errorController");

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.get("/name/:myName", homeController.respondWithName)
   .listen(port, () => {
     console.log(`The server has started running on port: ${port}`);
   })

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

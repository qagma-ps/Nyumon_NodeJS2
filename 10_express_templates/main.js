"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController"),
      layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);

app.get("/name/:myName", homeController.respondWithName)
   .listen(port, () => {
     console.log(`The server has started running on port: ${port}`);
   })

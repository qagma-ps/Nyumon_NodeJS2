"use strict";

const express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController"),
      layouts = require("express-ejs-layouts"),
      errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", (req, res) => {
  res.send("Welocome to Confetti Cuisine!");
})
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

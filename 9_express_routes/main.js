"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController");

app.use(homeController.logRequestPaths)

app.get("/items/:vegetable", homeController.sendReqParam);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})

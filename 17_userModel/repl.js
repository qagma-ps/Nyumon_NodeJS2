"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/recipe_db", {useNewUrlParser: true});
const User = require("./models/user");
const Subscriber = require("./models/subscriber");

var testUser;
User.create({
  name:{
    first: "Jon",
    last: "Wexler"
  },
  email: "jon@jonwexler.com",
  password: "pass123"
}).then(user => {
    testUser = user;
    return Subscriber.findOne({
    email: user.email
    });
  }).then(subscriber => {
    testUser.subscribedAccount = subscriber;
    testUser.save().then(user => console.log(`${user.fullName} updated`));

  }).catch(error => console.log(error.message));

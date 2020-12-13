"use strict";

const mongoose = require("mongoose"),
      dbURL = "mongodb://localhost:27017",
      dbName= "recipe_db",
      Subscriber = require("./models/subscriber");

/*
mongoDB.connect(dbURL, (error, client) => {
  if(error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
    .insert({
      name: "Freddie Mercury",
      email: "fred@queen.com"
    }, (error, db) => {
       if(error) throw error;
       console.log(db);
    });
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if(error) throw error;
      console.log(data);
    });
});
*/

mongoose.connect(dbURL, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/*
var subscriber1 = new Subscriber({
  name: "Jhon Doe",
  email: "jhon2@example.com"
});

subscriber1.save((error, savedDocument) => {
  if(error) console.log(error);
  console.log(savedDocument);
});

Subscriber.create(
  {
    name: "Jhonasan Dolosy",
    email: "jonasan@example.com"
  },
  function (error, savedDocument){
    if(error) console.log(error);
    console.log(savedDocument);
  }
);
*/

var myQuery = Subscriber.findOne({
                name: "Jhon Doe"
              })
              .where("email", /jhon/);
myQuery.exec((error, data) => {
  if(data) console.log(`${data.name} + ${data.email}`);
})

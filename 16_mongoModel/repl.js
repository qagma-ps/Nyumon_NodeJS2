"use strict";

const mongoose = require("mongoose");
// try Subscriber model
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
var testCourse, testSubscriber;

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);
mongoose.Promise = global.Promise;

Subscriber.remove({})
  .then(() => {
    return Course.remove({});
  }).then((items) => console.log(`Removed ${items.n} records!`))
    .then(() => {
      return Subscriber.create({
        name: "Jon",
        email: "jon@jonwexler.com",
        zipCode: "12345"
      });
    }).then(subscriber =>{
      console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    }).then(() => {
      return Subscriber.findOne({
        name: "Jon"
      });
    }).then(subscriber =>{
      testSubscriber = subscriber;
      console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    }).then(() => {
      return Course.create({
        title: "Tomato Land",
        description: "Locally farmed tomatoes only",
        zipCode: 12345,
        items: ["cherry", "heirloom"]
      });
    }).then(course =>{
      testCourse = course;
      console.log(`Created course: ${course.title}`);
    }).then(() => {
      testSubscriber.courses.push(testCourse);
      testSubscriber.save();
    }).then(() => {
      return Subscriber.populate(testSubscriber, "courses");
    }).then(subscriber => {
      console.log(subscriber)
    }).then(() => {
      return Subscriber.find(
        {courses: mongoose.Types.ObjectId(testCourse._id)}
      );
    }).then(subscriber => {
      console.log(subscriber)
    });
/*
Subscriber.create({
  name: "Jon",
  email: "jon@jonwexler.com",
  zipCode: "12345"
}).then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));

var subscriber;
Subscriber.findOne({
    name: "Jon"
  }).then(result => {
    subscriber = result;
    console.log(subscriber.getInfo());
  });

///next try Course models
const Course = require("./models/course");
var testCourse, testSubscriber;
Course.create({
  title: "Tomato Land",
  description: "Locally farmed tomatoes only",
  zipCode: 12345,
  items: ["cherry", "heirloom"]
}).then(course => {
    testCourse = course;
  }).catch(
    error => console.log(error.message)
  );
Subscriber.findOne({})
  .then(
    subscriber => {
      testSubscriber = subscriber
  }).catch(
    error => console.log(error.message)
  );

testSubscriber.courses.push(testCourse);
testSubscriber.save();
Subscriber.populate(testSubscriber, "courses").then(subscriber => {
  console.log(subscriber);
});
*/

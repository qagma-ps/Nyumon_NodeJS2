"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
  getAllSubscribers: (req, res) => {
    Subscriber.find({})
      .exec()
      .then((subscribers) => {
        res.render("subscribers/index", {subscribers: subscribers});
      })
      .catch((error) =>{
        console.log(error.message);
        return [];
      });
  },
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    newSubscriber.save()
      .then(() => {
        res.render("thanks");
      })
      .catch((error) => {
        if(error) res.send(error);
      });
  },
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching by subscriber id: ${error.message}`);
        next(error);
      })
  },
  showView: (req, res) => {
    res.render("subscribers/show");
  }
};

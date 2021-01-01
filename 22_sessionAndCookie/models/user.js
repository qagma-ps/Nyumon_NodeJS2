"use strict";

const mongoose = require("mongoose"),
      {Schema} = mongoose,
      Subscriber = require("./subscriber"),
      passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 99999
  },
  password: {
    type: String,
    required: true
  },
  course: [{
    type: Schema.Types.ObjectId,
    ref: "Course"
  }],
  subscribedAccount: {
    type: Schema.Types.ObjectId,
    ref: "Subscriber"}
}, {
  timestamps: true
});

userSchema.virtual("fullName")
    .get(function(){
      return `${this.name.first} ${this.name.last}`;
    });

userSchema.pre("save", function(next) {
  let user = this;
  if(user.subscribedAccount === undefined){
    Subscriber.findOne({
      email: user.email
    })
    .then(subscriber => {
      user.subscribedAccount = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error in connecting subscriber: ${error. message}`);
      next(error);
    });
  } else {
    next();
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

//make password hashed
/*
const bcrypt = require("bcrypt");
userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  })
  .catch(error => {
    console.log(`Error in hasing password: ${error.message}`);
    next(error);
  });
});

userSchema.methods.passwordComparison = function(inputPassword){
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};
*/

module.exports = mongoose.model("User", userSchema);

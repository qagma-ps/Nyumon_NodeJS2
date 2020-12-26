"use strict";

const mongoose = require("mongoose"),
      {Schema} = mongoose;

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
    lowercase: true,
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
  course: [{type: Schema.Types.ObjectId, ref: "Course"}],
  subscribedAccount: {type: Schema.Types.ObjectId, ref: "Subscriber"}
}, {
  timestamps: true
});

userSchema.virtual("fullName")
    .get(function(){
      return `${this.name.first} ${this.name.last}`;
    });

module.exports = mongoose.model("User", userSchema);

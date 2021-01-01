"use strict";

const mongoose = require("mongoose"),
      {Schema} = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  },
  maxStudents: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative number of students"]
  }
},{
  timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);

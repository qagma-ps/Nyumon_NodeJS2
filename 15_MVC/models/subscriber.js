"use strict";

const dbName= "recipe_db",
      mongoose = require("mongoose"),
      subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        zipCode: Number
      });

module.exports = mongoose.model(dbName, subscriberSchema);

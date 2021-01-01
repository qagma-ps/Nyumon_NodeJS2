"use strict";

const router = require("express").Router(),
      usersController = require("../controllers/usersController"),
      {check} = require("express-validator");

router.get("/", usersController.index, usersController.indexView);
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/new", usersController.new);
router.post("/create", [
  check('email','Email is invalid').normalizeEmail().trim().isEmail(),
  check('password', 'Password cannot be empty').notEmpty(),
  check('zipCode', 'ZipCode is invalid').notEmpty().isInt().isLength({
    min: 5,
    max: 5
  })
  ],
  usersController.validate, usersController.create, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;

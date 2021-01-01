"use strict";

const User = require("../models/user"),
      getUserParams = (body) => {
        return{
          name: {
            first: body.first,
            last: body.last
          },
          email: body.email,
          password: body.password,
          zipCode: body.zipCode
        }
      };
const {validationResult} = require("express-validator");
const passport = require("passport");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    if(req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) =>{
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      })
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {user: user});
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
        userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
    .then(user => {
      req.flash("success", `${user.fullName}'s account has successfully updated.`)
      res.locals.redirect =`/users/${userId}`;
      res.locals.user = user;
      next();
    })
    .catch (error => {
      console.log(`Error updating user by ID: ${error.message}`);
      res.locals.redirect = `/users/${userId}/update`;
      req.flash("error", `Failed to update user account because: ${error.message}.`)
      next();
    });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", `Account has deleted!`);
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        req.flash("error", `Error deleting this account because: ${error.message}.`)
      });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },
/*
  (req, res, next) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        user.passwordComparison(req.body.password)
          .then(passwordsMatch => {
            if(passwordsMatch){
              res.locals.redirect = `/users/${user._id}`;
              req.flash("success", `${user.fullName}'s logged in successfully!`);
              res.locals.user = user;
            } else {
              req.flash("error", "Failed to log in user account: Incorrect Password.");
              res.locals.redirect = "/users/login";
            }
            next();
          });
      } else {
        req.flash("error", "Failed to log in user accout: User account not found.");
        res.locals.redirect = "/users/login";
        next();
      }
    })
    .catch(error => {
      console.log(`Error logging in user: ${error.message}`);
      next(error);
    });
  },
*/
  validate: (req, res, next) => {
    const errors = validationResult(req);
      if(!errors.isEmpty()){
        let messages = errors.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    }
};

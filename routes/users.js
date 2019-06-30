const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");

//註冊面頁
router.get("/register", (req, res) => {
  res.render("register");
});

//登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

//註冊action
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  // console.log("req.body", req.body);
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log("This email is exist!");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      newUser
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
    }
  });
});

//登入action
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

//登出
router.get("/logout", (req, res) => {
  res.send("logout action");
});

module.exports = router;

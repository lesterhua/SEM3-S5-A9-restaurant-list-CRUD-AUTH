const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const bcrypt = require("bcryptjs");

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

      // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
      // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
      bcrypt.genSalt(10, (err, slat) => {
        bcrypt.hash(newUser.password, slat, (err, hash) => {
          newUser.password = hash;

          // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
          newUser
            .save()
            .then(user => {
              res.redirect("/");
            })
            .catch(err => console.log(err));
        });
      });
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
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;

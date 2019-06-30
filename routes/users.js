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

  // 加入錯誤訊息提示
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "所有欄位都是必填" });
  }

  if (password !== password2) {
    errors.push({ message: "密碼輸入錯誤" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: "這個 Email 已經註冊過了" });
        res.render("register", {
          errors,
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
  }
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
  req.flash("success_msg", "你已經成功登出");
  res.redirect("/users/login");
});

module.exports = router;

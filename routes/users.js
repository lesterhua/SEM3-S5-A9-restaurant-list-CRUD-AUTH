const express = require("express");
const router = express.Router();

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
  res.send("register action");
});

//登入action
router.post("/login", (req, res) => {
  res.send("login action");
});

//登出
router.get("/logout", (req, res) => {
  res.send("logout action");
});

module.exports = router;

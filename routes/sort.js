const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//Sort
router.get("/nameasc", authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ name_en: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/namedesc", authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ name_en: "desc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/category", authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ category: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/rating", authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ rating: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

module.exports = router;

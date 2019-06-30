const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//Sort
router.get("/nameasc", (req, res) => {
  Restaurant.find({})
    .sort({ name_en: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/namedesc", (req, res) => {
  Restaurant.find({})
    .sort({ name_en: "desc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/category", (req, res) => {
  Restaurant.find({})
    .sort({ category: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

router.get("/rating", (req, res) => {
  Restaurant.find({})
    .sort({ rating: "asc" })
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurant });
    });
});

module.exports = router;

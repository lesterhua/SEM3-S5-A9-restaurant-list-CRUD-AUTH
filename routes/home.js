const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//route setting for index page
router.get("/", authenticated, (req, res) => {
  //use Model find to get MongoDB to controller
  Restaurant.find({ userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants: restaurant });
  });
});

// route setting for search bar
router.get("/search", authenticated, (req, res) => {
  console.log("req.query.keyword", req.query.keyword);
  Restaurant.find({ userId: req.user._id }, (err, restaurant) => {
    const keyword = req.query.keyword;
    if (err) return console.error(err);

    const searchResult = restaurant.filter(({ name, category }) => {
      if (keyword) {
        return (
          name.toLowerCase().includes(keyword.toLowerCase()) ||
          category.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        return restaurant;
      }
    });
    return res.render("index", {
      restaurants: searchResult,
      keyword: keyword
    });
  });
});

module.exports = router;

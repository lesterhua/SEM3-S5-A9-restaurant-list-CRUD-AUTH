const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//route setting for index page
router.get("/", (req, res) => {
  //use Model find to get MongoDB to controller
  Restaurant.find((err, restaurant) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants: restaurant });
  });
});

// route setting for search bar
router.get("/search", (req, res) => {
  console.log("req.query.keyword", req.query.keyword);
  const keyword = req.query.keyword;
  Restaurant.find((err, restaurant) => {
    if (err) return console.error(err);

    const searchResult = restaurant.filter(({ name, category }) => {
      return (
        name.toLowerCase().includes(keyword.toLowerCase()) ||
        category.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    return res.render("index", { restaurants: searchResult, keyword: keyword });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//create new page
router.get("/new", (req, res) => {
  res.render("create");
});

// create new action
router.post("/", (req, res) => {
  console.log("req.body", req.body);
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    rating: req.body.rating,
    image: req.body.image,
    phone: req.body.phone,
    location: req.body.location,
    google_map: req.body.google_map,
    description: req.body.description
  });
  restaurant.save(function(err) {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

//detail page
router.get("/:id", (req, res) => {
  console.log("req.params.id", req.params.id);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("show", { restaurant: restaurant });
  });
});

//edit page
router.get("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("edit", { restaurant: restaurant });
  });
});

//edit action
router.put("/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    (restaurant.name = req.body.name),
      (restaurant.name_en = req.body.name_en),
      (restaurant.category = req.body.category),
      (restaurant.rating = req.body.rating),
      (restaurant.image = req.body.image),
      (restaurant.phone = req.body.phone),
      (restaurant.location = req.body.location),
      (restaurant.google_map = req.body.google_map),
      (restaurant.description = req.body.description);

    restaurant.save(function(err) {
      if (err) return console.error(err);
      return res.redirect(`/restaurant/${req.params.id}`);
    });
  });
});

//delete action
router.delete("/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      return res.redirect("/");
    });
  });
});

module.exports = router;

const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantList = require("../../restaurant.json").results;
const User = require("../users");
const bcrypt = require("bcryptjs");

//define user detail
const usersDefault = [
  {
    name: "",
    email: "user1@example.com",
    password: "12345678"
  },
  {
    name: "",
    email: "user2@example.com",
    password: "12345678"
  }
];

mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("Mongodb connected!");

  usersDefault.forEach((item, index) => {
    bcrypt.genSalt(10, (err, slat) => {
      bcrypt.hash(item.password, slat, (err, hash) => {
        const newUser = new User({
          name: item.name,
          email: item.email,
          password: hash
        });
        newUser
          .save()
          .then(user => {
            for (let i = index * 3; i < (index + 1) * 3; i++) {
              Restaurant.create({
                name: restaurantList[i].name,
                name_en: restaurantList[i].name_en,
                category: restaurantList[i].category,
                image: restaurantList[i].image,
                location: restaurantList[i].location,
                phone: restaurantList[i].phone,
                google_map: restaurantList[i].google_map,
                rating: restaurantList[i].rating,
                description: restaurantList[i].description,
                userId: user._id
              });
            }
          })
          .catch(err => console.log(err));
      });
    });
  });
  console.log("done");
});

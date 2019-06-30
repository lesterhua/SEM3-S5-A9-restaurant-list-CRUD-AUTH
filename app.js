// require data
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

const port = 2800;

// 使用 express session
app.use(
  session({
    secret: "fuiwefbfwefwjbf"
    // secret: 定義一組自己的私鑰（字串)
  })
);

// 使用 Passport
app.use(passport.initialize());
app.use(passport.session());

// 將值載入 Passport config裡的passport
require("./config/passport")(passport);

//登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//connection MongoDB
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true });

//setting express engine into handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use body-parse on express
app.use(bodyParser.urlencoded({ extended: true }));

// use method-override
app.use(methodOverride("_method"));

//use static files
app.use(express.static("public"));

//Assign Mongoose to db
const db = mongoose.connection;

// db connecting confirm if error
db.on("error", () => {
  console.log("mongodb error");
});

// db connecting confirm if success
db.once("open", () => {
  console.log("mongodb connected!");
});

// use routes
app.use("/", require("./routes/home"));
app.use("/restaurant", require("./routes/restaurant"));
app.use("/sort", require("./routes/sort"));
app.use("/users", require("./routes/users"));

//starting and listen web server
app.listen(port, () => {
  console.log(`Express app is running on : http://localhost:${port}`);
});

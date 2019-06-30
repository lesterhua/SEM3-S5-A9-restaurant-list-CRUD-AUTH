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
const flash = require("connect-flash");

const port = 3000;

// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式
  require("dotenv").config(); // 使用 dotenv 讀取 .env 檔案
}

// 使用 express session
app.use(
  session({
    secret: "fuiwefbfwefwjbf",
    // secret: 定義一組自己的私鑰（字串)
    resave: "false",
    saveUninitialized: "false"
  })
);

//use connect-flash
app.use(flash());

// 使用 Passport
app.use(passport.initialize());
app.use(passport.session());

// 將值載入 Passport config裡的passport
require("./config/passport")(passport);

//登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  // 辨識使用者是否已經登入的變數，讓 view 可以使用
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");

  next();
});

//connection MongoDB
mongoose.connect("mongodb://127.0.0.1/restaurant", {
  useNewUrlParser: true,
  useCreateIndex: true
});

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
app.use("/auth", require("./routes/auths"));

//starting and listen web server
app.listen(port, () => {
  console.log(`Express app is running on : http://localhost:${port}`);
});

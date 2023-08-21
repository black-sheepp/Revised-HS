const express = require("express");
const App = express();
const Port = 6700;
const expressLayouts = require("express-ejs-layouts");
const db = require("./Config/mongoose");
const bodyParser = require("body-parser");

// used for session cookie
const expressSession = require("express-session");
const passport = require("passport");
const passportLocal = require("./Config/passport-local-stratergy");
const MongoStore = require('connect-mongo')
 
// set views 
App.set("view engine", "ejs");
App.use(expressLayouts);
App.use(express.static("./Assets"));
// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }));

// Initialize Passport.js and set express session
App.use(
     expressSession({
          name: "HabitSense",
          secret: "habitSense app",
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 1000 * 100 * 60 * 10 },
          store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/HiveMind_Dev",
            autoRemove: "disabled",
       }),
     })
);
App.use(passport.initialize());
App.use(passport.session());
App.use(passport.setAuthenticatedUser);



App.use("/", require("./Routes"));
App.listen(Port, () => {
     console.log("Server is up and running on port:", Port);
});

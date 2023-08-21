const express = require("express");
const App = express();
const Port = 6700;
const expressLayouts = require("express-ejs-layouts");


// set views 
App.set("view engine", "ejs");
App.use(expressLayouts);
App.use(express.static("./Assets"));

App.use("/", require("./Routes"));

App.listen(Port, () => {
     console.log("Server is up and running on port:", Port);
});

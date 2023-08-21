const passport = require("passport");
const User = require("../Model/user");
const Habit = require("../Model/habit");

module.exports.home = async (req, res) => {
     if(req.isAuthenticated()){
          let habitrecord = await Habit.find({ user: req.user._id}).sort({createdAt: -1});
          return res.render("home", {
               title: "Home",
               habitrecord,
          });
     }
     return res.render("home", {
          title: "Home",
     });
};

module.exports.signIn = (req, res) => {
     if (req.isAuthenticated()) {
          return res.redirect("/");
     }
     return res.render("signIn", {
          title: "Log In",
     });
};

module.exports.signUp = (req, res) => {
     if (req.isAuthenticated()) {
          return res.redirect("/");
     }
     return res.render("signUp", {
          title: "Register",
     });
};

module.exports.registerUser = async (req, res) => {
     let user = await User.findOne({ email: req.body.email });

     if (!user) {
          await User.create(req.body);
          return res.redirect("/sign-in");
     }

     if (user) {
          return res.redirect("/sign-in");
     } else {
          return res.redirect("back");
     }
};

module.exports.logoutSession = function(req,res){
     req.logout(function (err) {
          if (err) {
               return next(err);
          }
          res.redirect("/");
     });
}

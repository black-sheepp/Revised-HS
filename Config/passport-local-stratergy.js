const passport = require("passport");
const User = require("../Model/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
     new LocalStrategy(
          {
               usernameField: "email",
          },
          async function (email, password, done) {
               await User.findOne({ email: email }).then((user) => {
                    if (!user || user.password != password) {
                         console.log("Invalid Username/Password");
                         return done(null, false);
                    }
                    return done(null, user);
               })
               // .catch((err)=>{
               //      if (err) {
               //           console.log("Error in finding user --> passport");
               //           return done(err);
               //      }
               // });
          }
     )
);

passport.serializeUser((user,done)=>{
     done(null, user.id);
})

passport.deserializeUser((id,done)=>{
     User.findById(id).then((user)=>{
          return done(null, user)
     }).catch((err)=>{
          console.log("error in finding user")
     })
})

passport.checkAuthenticaiton = function(req,res,next){
     if(req.isAuthenticated()){
          return next();
     }
     return res.redirect('/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
     if(req.isAuthenticated()){
          res.locals.user = req.user;
     }
      next();
}

module.exports = passport;
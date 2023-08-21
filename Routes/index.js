const router = require("express").Router();
const passport = require("passport");
const homeController = require("../Controller/home");
const userController = require("../Controller/user");

router.get("/", homeController.home);
router.get("/sign-in", homeController.signIn);
router.get("/sign-up", homeController.signUp);
router.post("/sign-up-done", homeController.registerUser);
router.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/sign-in" }));
router.post("/create-new-habit",userController.createNewHabit)
router.get('/delete-one-habit/:id',userController.deleteOneHabit)
router.get('/logout', homeController.logoutSession)

module.exports = router;



 

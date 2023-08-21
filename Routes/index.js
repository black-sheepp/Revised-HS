const router = require("express").Router();
const homeController = require("../Controller/home");

router.get("/", homeController.home);

module.exports = router;

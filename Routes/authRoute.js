const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

router.post("/login", authController.login);
router.post("/create-user", authController.createUser);
module.exports = router;
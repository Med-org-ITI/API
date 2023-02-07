const express = require("express");

const adminAuthController = require("../controller/adminAuth");

const router = express.Router();
// POST /login ->
router.post("/login", adminAuthController.login);

// POST /logout ->
router.post("/logout", adminAuthController.logout);

module.exports = router;

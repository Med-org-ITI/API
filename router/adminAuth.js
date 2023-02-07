const express = require('express');

const adminAuthController = require('../controller/adminAuth');

const router = express.Router();

router.post('/login', adminAuthController.login);
router.post('/logout', adminAuthController.logout);

module.exports = router;

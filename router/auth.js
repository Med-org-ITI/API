const { Router } = require('express');
const { login, signup } = require('../controller/auth');

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;

const express = require('express');
const {
  addAddress,
  getLoggedUserAddresses,
  removeAddrees,
} = require('../controller/addressController');

const authService = require('../controller/authController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddrees);

module.exports = router;

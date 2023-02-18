const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resizeImage,
  uploadUsreImage,
} = require('../controller/userController');
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require('../utils/validators/userValidator');

const router = express.Router();
const itemRoute = require('./itemRoute');

router.use('/:userId/items', itemRoute);

router
  .route('/')
  .get(getUsers)
  .post(uploadUsreImage, resizeImage, createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUsreImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

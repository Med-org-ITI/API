const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require('../utlis/validators/userValidator');

const router = express.Router();
const itemRoute = require('./itemRoute');

router.use('/:userId/items', itemRoute);

router.route('/').get(getUsers).post(createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

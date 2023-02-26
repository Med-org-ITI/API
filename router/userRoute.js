const express = require('express');

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  uploadUsreImage,
  resizeImage,
  deleteLoggedUserData,
} = require('../controller/userController');
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserPasswordValidator,
  updateLoggedUserDataValidator,
} = require('../utils/validators/userValidator');

const authService = require('../controller/authController');

const router = express.Router();
const itemRoute = require('./itemRoute');

router.use('/:userId/items', itemRoute);

router.get('/getMe', authService.protect, getLoggedUserData, getUser);
router.put(
  '/changeMyPassword',
  authService.protect,
  updateLoggedUserPasswordValidator,
  updateLoggedUserPassword
);
router.put(
  '/updateMe',
  authService.protect,
  uploadUsreImage,
  resizeImage,
  updateLoggedUserDataValidator,
  updateLoggedUserData
);
router.delete('/deleteMe', authService.protect, deleteLoggedUserData);

router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route('/')
  .get(authService.protect, authService.allowedTo('admin', 'manager'), getUsers)
  .post(
    authService.protect,
    authService.allowedTo('admin'),
    uploadUsreImage,
    resizeImage,
    createUserValidator,
    createUser
  );
router
  .route('/:id')
  .get(
    authService.protect,
    authService.allowedTo('admin'),
    getUserValidator,
    getUser
  )
  .put(
    authService.protect,
    authService.allowedTo('admin'),
    uploadUsreImage,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteUserValidator,
    deleteUser
  );

module.exports = router;

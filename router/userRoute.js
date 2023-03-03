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

router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword);

router.use(authService.protect);
// router.use(itemRoute);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', authService.protect, updateLoggedUserPasswordValidator, updateLoggedUserPassword);

router.put('/updateMe', uploadUsreImage, resizeImage, updateLoggedUserDataValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

router

	.route('/')
	.get(authService.allowedTo('admin', 'manager'), getUsers)
	.post(authService.allowedTo('admin'), uploadUsreImage, resizeImage, createUserValidator, createUser);

router
	.route('/:id')
	.get(authService.allowedTo('admin', 'user'), getUserValidator, getUser)
	.put(authService.allowedTo('admin'), uploadUsreImage, resizeImage, updateUserValidator, updateUser)
	.delete(authService.allowedTo('admin'), deleteUserValidator, deleteUser);

module.exports = router;

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
router.use(itemRoute);
router.use(authService.protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPasswordValidator, updateLoggedUserPassword);
router.put('/updateMe', uploadUsreImage, resizeImage, updateLoggedUserDataValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

router.route('/').get(authService.allowedTo('admin', 'manager'), getUsers);

router
	.use(authService.allowedTo('admin'))

	.post(uploadUsreImage, resizeImage, createUserValidator, createUser);
router
	.route('/:id')
	.get(getUserValidator, getUser)
	.put(uploadUsreImage, resizeImage, updateUserValidator, updateUser)
	.delete(deleteUserValidator, deleteUser);

module.exports = router;

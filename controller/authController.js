const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// const cloud = require('../utils/uploadImgCloudinary');

const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');

// @des signup
// @route GET /auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res) => {
	// 1) Create user
	// upload image (Cloudinary)
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		address: req.body.address,
		profileImage: req.file ? req.file.path : '',
	});

	// remove images from folder uploads

	// 2) Generate token
	const token = generateToken(user._id);

	res.status(201).json({ data: user, token });
});

// @des login
// @route GET /auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
	// 1) check if password and email n the body (validator)
	// 2) check if user exist & check if password correct
	const user = await User.findOne({ email: req.body.email });

	if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
		return next(new ApiError('Incorrect email or password', 401));
	}

	// 3) generate token
	const token = generateToken(user._id);

	// 4) send response to clinet side
	res.status(200).json({ data: user, token });
});

// @des make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
	// 1) Check if token exist, if exist get it

	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return next(new ApiError('You are not login, Please login to get access this route', 401));
		}
	}

	// 2) Verify token (no change happens || expired token)
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

	// 3) Check if user exist
	const currentUser = await User.findById(decoded.userId);
	if (!currentUser) {
		return next(new ApiError('The user that belong to this token does no longer exist', 401));
	}

	// 4) Check if user change his password after token created
	if (currentUser.passwordChangedAt) {
		const passChangedTimestam = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);

		// password changed after token created (Error)
		if (passChangedTimestam > decoded.iat) {
			return next(new ApiError('User recently changed his password, please login again...', 401));
		}
	}
	req.user = currentUser;
	next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
	asyncHandler(async (req, res, next) => {
		// 1) access roles
		// 2) access registered user (req.user.role)
		if (!roles.includes(req.user.role)) {
			return next(new ApiError('You are not allowed to access this route', 403));
		}
		next();
	});

// @desc    Forgot password
// @route   POST /auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	// 1) Get user by email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ApiError(`There is no user with this email ${req.body.email}`));
	}
	// 2) If user exist, Generate reset random 6 digits and save it in DB
	const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
	const hashResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');

	// Save hashed password reset code into DB
	user.passwordResetCode = hashResetCode;
	// Add expiration time for password reset code (10 minute)
	user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	user.passwordResetVerified = false;

	await user.save();

	const message = `${user.name}, \nWe received a request to reset the password on your Roshetet 3elag Account. \n${resetCode} \nEnter this code to complete the reset \nThanks for helping us keep your account secure. \nThe Roshetet 3elag Team`;
	// const message = {
	//   html: `
	//       <html>
	//           <head>
	//               <style>
	//                   h1 { color: blue; }
	//               </style>
	//           </head>
	//           <body>
	//               <h1>${user.name}</h1>
	//               <p>We received a request to reset the password on your Roshetet 3elag Account. \n${resetCode} \nEnter this code to complete the reset \nThanks for helping us keep your account secure. \nThe Roshetet 3elag Team</p>
	//           </body>
	//       </html>
	//   `,
	// };
	// 3) Send the reset code via email
	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset code (valid for 10 minute',
			message,
		});
	} catch (err) {
		user.passwordResetCode = undefined;
		user.passwordResetExpires = undefined;
		user.passwordResetVerified = undefined;

		await user.save();
		return next(new ApiError('There is an error in sending to email', 500));
	}

	res.status(200).json({ status: 'Success', message: ' Reset code sent to email' });
});

// @desc    Verify password reset code
// @route   POST /auth/verifyResetCode
// @access  Public
exports.verifyPassRestCode = asyncHandler(async (req, res, next) => {
	// 1) Get user based in reset code
	const hashResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');

	const user = await User.findOne({
		passwordResetCode: hashResetCode,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) {
		return next(new ApiError('Reset code invalid or expired'));
	}

	// 2) Reset code valid
	user.passwordResetVerified = true;
	await user.save();

	res.status(200).json({
		status: 'Confirmation succeeded',
	});
});

// @desc    Reset password
// @route   POST /auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// 2) Get user based in email
	const user = User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ApiError(`There is no user with email ${req.body.email}`, 404));
	}

	// 2) Check if user code verfied
	if (!user.passwordResetVerified) {
		return next(new ApiError('Reset code not verfied', 400));
	}

	user.password = req.body.newPassword;
	user.passwordResetCode = undefined;
	user.passwordResetExpires = undefined;
	user.passwordResetVerified = undefined;

	await user.save();

	// 3) if everything is ok, generate token

	const token = generateToken(user._id);
	res.status(200).json({ token });
});

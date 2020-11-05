const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const createSendToken = require('../utils/createSendToken');

// user signup, login & logout:
exports.signup = catchAsync(async (req , res , next) => {
	const newUser = await User.create({
		name: req.body.name ,
		email: req.body.email ,
		password: req.body.password ,
		passwordConfirm: req.body.passwordConfirm ,
		role: req.body.role ,
	});
	createSendToken(newUser , 201 , req , res);
});
exports.login = catchAsync(async (req , res , next) => {
	const { email , password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password!' , 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password , user.password))) {
		return next(new AppError('Incorrect email or password' , 401));
	}

	// legit user... send token:
	createSendToken(user , 200 , req , res);
});
exports.logout = catchAsync(async (req , res , next) => {
	res.cookie( 'jwt' , 'loggedOut' , {
		expires: new Date(Date.now() + 2 * 1000) ,
		httpOnly: true ,
	});
	res.status(200).json({ status: 'success' });
});
// reset password:
exports.forgetPassword = catchAsync(async (req , res , next) => {
	// 1. get user based on posted email:
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('There is no user with that email address!' , 404));
	}

	// 2. generate the random reset token:
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3. send it to users email:
	try {
		const resetUrl = `${req.protocol }://${req.get('host') }/resetPassword/${resetToken }`;
		await new Email(user , resetUrl).send();
		res.status(200).json({
			status: 'success' ,
			message: 'Token sent to email!' ,
		});
	} catch (e) {
		console.log(e);
		user.PasswordResetToken = undefined;
		user.PasswordResetExpired = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new AppError('There was an error sending the email. Try again later!' , 500));
	}
});
exports.resetPassword = catchAsync(async (req , res , next) => {
	// 1. get user based on token:
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await User.findOne({ passwordResetToken: hashedToken , passwordResetExpires: {$gt: Date.now()} });

	// 2. if token has not expired, and there is user, set the new password:
	if (!user) {
		return next(new AppError('Token is invalid or expired' , 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3. update changedPasswordAt property fot the user:
	// 4. log the user in, send jwt:
	createSendToken(user, 200, req , res);
});

// Global middleware for checking if the user is logged in:
exports.isLoggedIn = async (req , res , next) => {
	try {
		if (req.cookies.jwt) {
			// verify the token:
			const decoded = await promisify(jwt.verify)(req.cookies.jwt , process.env.JWT_SECRET);
			
			// check if the user exists?:
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next();
			}
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}

			// there is a logged in user:
			res.locals.user = currentUser;
			return next();
		}
	} catch (e) {
		return next();
	}
	next();
};

// routes protection:
exports.protect = catchAsync(async (req , res , next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('You are not logged in! Please login to get access' , 401));
	}
	const decoded = await promisify(jwt.verify)(token , process.env.JWT_SECRET);
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('The user belonging to the token dose not exist!' , 401));
	}
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(new AppError('User recently changed password! Please login again!' , 401));
	}
	req.user = currentUser;
	next();
});
exports.restrictTo = (...roles) => {
	return (req , res , next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action' , 403));
		}
		next();
	}
};


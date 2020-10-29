const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const sendResponse = (res , statusCode , data , token) => {
	res.status(statusCode).json({
		status: 'success' ,
		token ,
		data: data ,
	});
}

// create token
const signToken = (id) => {
	return jwt.sign({ id } , process.env.JWT_SECRET , {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}
// send token
const createSendToken = (user , statusCode , res) => {
	// create token:
	const token = signToken(user._id);

	// store in cookie:
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000) ,
		httpOnly: true ,
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt' , token , cookieOptions);

	// Remove unwanted fields from output:
	user.password = undefined;
	user.__v = undefined;
	user.active = undefined;

	sendResponse(res , statusCode , { user } , token);
};


exports.signup = catchAsync(async (req , res , next) => {
	const newUser = await User.create({
		name: req.body.name ,
		email: req.body.email ,
		password: req.body.password ,
		passwordConfirm: req.body.passwordConfirm ,
		role: req.body.role ,
	});
	createSendToken(newUser , 201 , res);
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
	createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req , res , next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
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
	const resetUrl = `${req.protocol }://${req.get('host') }/api/v1/users/resetPassword/${resetToken }`;
	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl }.\nIf you didn't forget your password, please ignore this email!`;

	try {
		await sendEmail({
			email: user.email ,
			subject: 'Your password reset token (valid for 10 min)' ,
			message ,
		});
		res.status(200).json({
			status: 'success' ,
			message: 'Token sent to email!' ,
		});
	} catch (e) {
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
	console.log(user);
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3. update changedPasswordAt property fot the user:
	// 4. log the user in, send jwt:
	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req , res , next) => {
	// 1. get user from the collection:
	const user = await User.findById(req.user.id).select('+password');

	// 2. check if the posted current password is correct:
	if (!(await user.correctPassword(req.body.passwordCurrent , user.password))) {
		return next(new AppError('Your current password is wrong.' , 401))
	}

	// 3. if current password was correct, update new password:
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	// 4. log user in, send jwt:
	createSendToken(user, 200, res);
});